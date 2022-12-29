<template>
  <LoadingIcon v-if="loading"></LoadingIcon>
  <WebFrame v-else ref="frame">
    <div class="container">
      <h1 class="p-3">Welcome to Hexxagon!</h1>
      <div class="game-container">
        <div class="header">
          <h2 class="counter">
            <PlayerStone :player="'X'"></PlayerStone>
            :
            <span>{{ counter1 }}</span>
          </h2>
          <h2 class="status">
            {{ gameStatus }}
          </h2>
          <h2 class="counter">
            <PlayerStone :player="'O'"></PlayerStone>
            :
            <span>{{ counter2 }}</span>
          </h2>
        </div>
        <div v-for="rowInd in game.field.rows" :key="rowInd - 1" class="row">
          <div class="tileRow">
            <HexTile
              v-for="colInd in game.field.cols"
              :key="colInd - 1"
              ref="hex"
              :stone="getCell(rowInd - 1, colInd - 1)"
              @click="clickTile(rowInd - 1, colInd - 1)"
            >
            </HexTile>
          </div>
        </div>
      </div>

      <div class="dropup actionbutton text-capitalize p-3">
        <button
          id="dropdownMenuButton"
          aria-expanded="false"
          class="btn btn-light dropdown-toggle text-capitalize fs-4"
          data-bs-toggle="dropdown"
          type="button"
        >
          <font-awesome-icon class="mt-1" icon="keyboard" size="1x">
          </font-awesome-icon>
          actions
        </button>
        <div aria-labelledby="dropdownMenuButton" class="dropdown-menu">
          <a id="undo" class="dropdown-item" @click="doAction('undo')">undo</a>
          <a id="redo" class="dropdown-item" @click="doAction('redo')">redo</a>
          <a
            id="save"
            class="dropdown-item"
            data-bs-target="#saveModal"
            data-bs-toggle="modal"
            >save</a
          >
          <a
            id="load"
            class="dropdown-item"
            data-bs-target="#loadModal"
            data-bs-toggle="modal"
            >load</a
          >
          <a
            id="reset"
            class="dropdown-item"
            data-bs-target="#resetModal"
            data-bs-toggle="modal"
            >reset</a
          >
        </div>
      </div>
    </div>
  </WebFrame>
  <ResetModal></ResetModal>
  <SaveModal></SaveModal>
  <LoadModal></LoadModal>
  <GameOverModal
    v-model="gameOverModal"
    :winner="winner"
    @close="gameOverModal = false"
  ></GameOverModal>
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
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import HexTile from "@/components/HexTile.vue";
import PlayerStone from "@/components/PlayerStone.vue";
import { Field } from "@/assets/classes";
import LoadingIcon from "@/components/LoadingIcon.vue";
import WebFrame from "@/views/WebFrame.vue";
import ResetModal from "@/components/ResetModal.vue";
import { clickSound, errorSound, gameOverSound, SERVER_URL } from "@/main";
import SaveModal from "@/components/SaveModal.vue";
import LoadModal from "@/components/LoadModal.vue";
import GameOverModal from "@/components/GameOverModal.vue";

export const availableTurns = ["X", "O"];
export const statusText = [
  "GAME OVER",
  "Your turn",
  "Waiting for other player...",
  "You are spectator",
];
export const WS_PLAYER_REQUEST = "Requesting player number";
export const WS_PLAYER_RESPONSE = "Player number: ";
export const WS_KEEP_ALIVE_RESPONSE = "Keep alive";
export const WS_KEEP_ALIVE_REQUEST = "ping";

export default {
  name: "GameView",
  components: {
    GameOverModal,
    LoadModal,
    SaveModal,
    ResetModal,
    WebFrame,
    LoadingIcon,
    PlayerStone,
    HexTile,
  },
  data() {
    return {
      socket: undefined,
      loading: Boolean,
      counter1: "",
      counter2: "",
      gameStatus: "",
      playerNumber: "",
      game: undefined,
      snackbar: false,
      msg: String,
      gameOverModal: false,
      winner: Number,
    };
  },
  mounted() {
    fetch("http://" + SERVER_URL + "/game", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((json) => {
        this.updateGame(json);
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });

    this.socket = new WebSocket("ws://" + SERVER_URL + "/ws");

    this.socket.onopen = () => {
      console.log("WebSocket connection established");
      this.socket.send(WS_PLAYER_REQUEST);

      setInterval(() => this.socket.send(WS_KEEP_ALIVE_REQUEST), 20000); // ping every 20 seconds
    };

    this.socket.onmessage = (event) => {
      const msg = event.data;

      if (msg.startsWith(WS_PLAYER_RESPONSE)) {
        this.playerNumber = msg.split(" ")[2];
        console.log(`${WS_PLAYER_RESPONSE} ${this.playerNumber}`);
        this.initStatus();
      } else if (msg === WS_KEEP_ALIVE_RESPONSE) {
        console.log("[ping] " + msg);
      } else {
        const json = JSON.parse(msg);
        this.updateGame(json);
      }
    };

    this.socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        console.log("[close] Connection died");
      }
    };

    this.socket.onerror = (error) => {
      console.error(`[error] ${error.message}`);
    };
  },
  beforeUnmount() {
    if (this.socket) this.socket.close();
  },
  methods: {
    doAction: async function (action) {
      const res = await fetch(`http://${SERVER_URL}/` + action, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: "",
      });

      if (res.ok) {
        if (this.$refs.frame.soundToggle) {
          if (clickSound.paused) await clickSound.play();
          else clickSound.currentTime = 0;
        }

        this.socket.send(
          `Action done: ${action} -> Response: ${await res.text()}`
        );
      } else this.triggerToast(await res.text());
    },

    clickTile: async function (row, col) {
      switch (this.playerNumber) {
        case "1":
        case "2":
          await this.doAction(
            `place/${col}/${row}/${availableTurns[this.playerNumber - 1]}`
          );
          break;
        default:
          this.triggerToast(statusText[3]);
      }
    },

    updateGame: function (fieldRes) {
      // update the page
      this.updateCounter(fieldRes);
      // only update status for playing users
      if (this.playerNumber === "1" || this.playerNumber === "2") {
        this.updateStatus(fieldRes.turn);
      }
      this.updateField(fieldRes);

      const c1 = fieldRes.xcount;
      const c2 = fieldRes.ocount;

      // Game over or new game
      if (c1 + c2 === this.$refs.hex?.length) {
        this.gameOver();
        this.updateStatus(0);
      }
    },

    gameOver: function () {
      if (this.$refs.frame.soundToggle) gameOverSound.play();

      this.winner =
        this.counter1 > this.counter2
          ? 1
          : this.counter1 < this.counter2
          ? 2
          : 0;

      this.gameOverModal = true;
    },

    getCell: function (row, col) {
      const cell = this.game.field.cells.find(
        (cell) => cell.row === row && cell.col === col
      );
      return cell?.cell ? cell.cell : " ";
    },

    initStatus: function () {
      switch (this.playerNumber) {
        case "1": // player 1 always starts <- bad
          this.gameStatus = statusText[1];
          break;
        case "2": // player 2 has to wait
          this.gameStatus = statusText[2];
          break;
        default: // not allowed to play
          this.gameStatus = statusText[3];
          break;
      }
    },

    updateStatus: function (turn) {
      switch (turn.toString()) {
        case "0": // game over
          this.gameStatus = statusText[0];
          break;
        case this.playerNumber: // your turn
          this.gameStatus = statusText[1];
          break;
        default: // other player's turn
          this.gameStatus = statusText[2];
          break;
      }
    },

    updateCounter: function (json) {
      // update the page elements
      this.counter1 = json.xcount;
      this.counter2 = json.ocount;
    },

    updateField: function (json) {
      this.game = Field.from(json);
    },

    triggerToast: function (msg) {
      if (this.$refs.frame.soundToggle) {
        if (errorSound.paused) errorSound.play();
        else errorSound.currentTime = 0;
      }

      this.msg = msg;
      this.snackbar = true;
    },
  },
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

.status {
  padding: 0 2.5em;
  font-family: Hexa, serif;
}

.header {
  font-size: 2rem;
  display: flex;
  align-content: center;
  justify-content: space-between;
  min-width: 50%;
  margin-bottom: 1.8em;
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
</style>
