<template>
  <WebFrame ref="frame">
    <div class="container">
      <h1 class="p-3">Welcome to Hexxagon!</h1>
      <div class="game-container">
        <div class="header">
          <h2 class="counter">
            <PlayerStone :player="'X'"></PlayerStone>
            : {{ counter1 }}
          </h2>
          <h2 class="status">
            {{ gameStatus }}
          </h2>
          <h2 class="counter">
            <PlayerStone :player="'O'"></PlayerStone>
            : {{ counter2 }}
          </h2>
        </div>
        <div v-for="rowInd in rows" :key="rowInd" class="row">
          <div class="tileRow">
            <HexTile
              v-for="colInd in columns"
              :key="colInd"
              ref="hex"
              :stone="content(rowInd, colInd)"
              @click="clickTile(rowInd, colInd)"
            >
            </HexTile>
          </div>
        </div>
      </div>
    </div>
  </WebFrame>
  <ResetModal></ResetModal>
  <SaveModal></SaveModal>
  <LoadModal></LoadModal>

  <v-snackbar v-model="snackbar" color="white">
    <font-awesome-icon
      class="mt-1 mx-lg-2 fs-2"
      icon="triangle-exclamation"
      size="1x"
    >
    </font-awesome-icon>
    <span class="toast-holder">
      {{ msg }}
    </span>
    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="snackbar = false">
        <font-awesome-icon
          class="m-lg-1"
          icon="x"
          size="1x"
        ></font-awesome-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import HexTile from "@/components/HexTile.vue";
import PlayerStone from "@/components/PlayerStone.vue";
import WebFrame from "@/views/WebFrame.vue";
import ResetModal from "@/components/ResetModal.vue";
import SaveModal from "@/components/SaveModal.vue";
import LoadModal from "@/components/LoadModal.vue";
import { clickSound, errorSound, gameOverSound } from "@/main";

export const availableTurns = ["X", "O"];
export const EMPTY = "E";
export const statusText = ["Turn Player 1", "Turn Player 2", "GAME OVER"];

export default {
  name: "GameView",
  components: {
    LoadModal,
    SaveModal,
    ResetModal,
    WebFrame,
    PlayerStone,
    HexTile
  },
  data() {
    return {
      counter1: 0,
      counter2: 0,
      gameStatus: statusText[0],
      snackbar: false,
      msg: String,
      turn: availableTurns[0],
      hexField: new Map(),
      neighbors: new Map(),
      columns: 9,
      rows: 6
    };
  },
  beforeMount() {
    this.initBoard();
  },
  methods: {
    initBoard() {
      for (let i = 1; i <= this.rows; i++) {
        for (let j = 1; j <= this.columns; j++) {
          this.hexField.set(`${i}:${j}`, EMPTY);
          this.neighbors.set(
            `${i}:${j}`,
            i === 1 && j === 1
              ? [`${i}:${j + 1}`, `${i + 1}:${j}`]
              : i === 1 && j === this.columns
                ? [`${i}:${j - 1}`, `${i + 1}:${j}`]
                : i === this.rows && j === 1
                  ? [`${i}:${j + 1}`, `${i - 1}:${j + 1}`, `${i - 1}:${j}`]
                  : i === this.rows && j === this.columns
                    ? [`${i}:${j - 1}`, `${i - 1}:${j - 1}`, `${i - 1}:${j}`]
                    : i === 1
                      ? j % 2 === 0
                        ? [
                          `${i}:${j - 1}`,
                          `${i}:${j + 1}`,
                          `${i + 1}:${j - 1}`,
                          `${i + 1}:${j + 1}`,
                          `${i + 1}:${j}`
                        ]
                        : [`${i}:${j - 1}`, `${i}:${j + 1}`, `${i + 1}:${j}`]
                      : i === this.rows
                        ? j % 2 === 0
                          ? [`${i}:${j - 1}`, `${i}:${j + 1}`, `${i - 1}:${j}`]
                          : [
                            `${i}:${j - 1}`,
                            `${i}:${j + 1}`,
                            `${i - 1}:${j - 1}`,
                            `${i - 1}:${j + 1}`,
                            `${i - 1}:${j}`
                          ]
                        : j === 1
                          ? [
                            `${i - 1}:${j}`,
                            `${i + 1}:${j}`,
                            `${i}:${j + 1}`,
                            `${i - 1}:${j + 1}`
                          ]
                          : j === this.columns
                            ? [
                              `${i - 1}:${j}`,
                              `${i - 1}:${j - 1}`,
                              `${i}:${j - 1}`,
                              `${i + 1}:${j}`
                            ]
                            : j % 2 === 0
                              ? [
                                `${i}:${j - 1}`,
                                `${i}:${j + 1}`,
                                `${i - 1}:${j}`,
                                `${i + 1}:${j}`,
                                `${i + 1}:${j - 1}`,
                                `${i + 1}:${j + 1}`
                              ]
                              : [
                                `${i}:${j - 1}`,
                                `${i}:${j + 1}`,
                                `${i - 1}:${j}`,
                                `${i + 1}:${j}`,
                                `${i - 1}:${j - 1}`,
                                `${i - 1}:${j + 1}`
                              ]
          );
        }
      }
    },
    content(x, y) {
      return this.hexField.get(`${x}:${y}`);
    },
    clickTile(i, n) {
      if (this.hexField.get(`${i}:${n}`) !== EMPTY) {
        if (this.$refs.frame.soundToggle) {
          if (errorSound.paused) errorSound.play();
          else errorSound.currentTime = 0;
        }

        this.triggerToast("Occupied!");
        return;
      }

      if (this.$refs.frame.soundToggle) {
        if (clickSound.paused) clickSound.play();
        else clickSound.currentTime = 0;
      }

      this.hexField.set(`${i}:${n}`, this.turn);
      let addPoints = 1;
      let subPoints = 0;
      this.neighbors.get(`${i}:${n}`).forEach((neighbor) => {
        if (
          this.hexField.get(neighbor) !== this.turn &&
          this.hexField.get(neighbor) !== EMPTY
        ) {
          this.hexField.set(neighbor, this.turn);
          addPoints++;
          subPoints++;
        }
      });
      if (this.turn === availableTurns[0]) {
        this.counter1 += addPoints;
        this.counter2 -= subPoints;
      } else {
        this.counter2 += addPoints;
        this.counter1 -= subPoints;
      }

      const nextTurn = this.turn === availableTurns[0] ? 1 : 0;
      this.turn = availableTurns[nextTurn];
      this.gameStatus = statusText[nextTurn];

      if (
        Number(this.counter1) + Number(this.counter2) ===
        this.rows * this.columns
      ) {
        this.gameOver();
        this.gameStatus = statusText[2];
      }
    },

    gameOver: function() {
      if (this.$refs.frame.soundToggle) gameOverSound.play();

      const gameOverMessage =
        this.counter1 > this.counter2
          ? "Player 1 wins!"
          : this.counter1 < this.counter2
            ? "Player 2 wins!"
            : "It's a draw!";

      this.triggerToast(gameOverMessage);
    },

    triggerToast: function(msg) {
      this.msg = msg;
      this.snackbar = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@use "sass:math";

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tileRow {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: math.div(8vmin, 8);
}

.toast-holder {
  font-size: 1.75rem;
}

.row:last-child {
  padding-bottom: 4.5rem;
}
</style>
