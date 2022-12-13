<template>
  <LoadingIcon v-if="loading"></LoadingIcon>
  <WebFrame v-else>
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
        <div v-for="rowInd in game.field.rows" :key="rowInd" class="row">
          <div class="tileRow">
            <HexTile
              v-for="colInd in game.field.cols"
              :key="colInd"
              ref="hex"
              :stone="getCell(rowInd, colInd)"
              @click="clickTile(rowInd, colInd)"
            >
            </HexTile>
          </div>
        </div>
      </div>

      <div class="dropup actionbutton text-capitalize p-4">
        <button
          id="dropdownMenuButton"
          aria-expanded="false"
          class="btn btn-light dropdown-toggle text-capitalize fs-4"
          data-bs-toggle="dropdown"
          type="button"
        >
          <i class="bi bi-dpad-fill p-1"></i>
          actions
        </button>
        <div
          aria-labelledby="dropdownMenuButton"
          class="dropdown-menu dropdown-menu-dark"
        >
          <a id="undo" class="dropdown-item" onclick="doAction('undo')">undo</a>
          <a id="redo" class="dropdown-item" onclick="doAction('redo')">redo</a>
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
</template>

<script>
import HexTile from "@/components/HexTile.vue";
import PlayerStone from "@/components/PlayerStone.vue";
import { Field } from "@/assets/classes";
import LoadingIcon from "@/components/LoadingIcon.vue";
import WebFrame from "@/views/WebFrame.vue";

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
export const SERVER_URL = "localhost:9000";

export default {
  name: "GameView",
  components: { WebFrame, LoadingIcon, PlayerStone, HexTile },
  data() {
    return {
      socket: undefined,
      loading: Boolean,
      counter1: String,
      counter2: String,
      gameStatus: String,
      playerNumber: String,
      game: undefined,
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
    clickTile: async function (row, col) {
      switch (this.playerNumber) {
        case "1":
        case "2":
          await this.doAction(
            `http://${SERVER_URL}/place/${col}/${row}/${
              availableTurns[this.playerNumber - 1]
            }`
          );
          break;
        default:
          this.triggerToast(statusText[3]);
      }
    },

    doAction: async function (action) {
      const res = await fetch(action, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: "",
      });

      if (res.ok)
        this.socket.send(
          `Action done: ${action} -> Response: ${await res.text()}`
        );
      else this.triggerToast(await res.text());
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
      //const content = $("#game-over-content");
      //if (counter1 > counter2)
      //  content.text("Player 1 🔷 wins!");
      //else if (counter2 > counter1)
      //  content.text("Player 2 🔴 wins!");
      //else
      //  content.text("It's a draw! ⚪");
      //$("#gameOverModal").modal("show");
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

    triggerToast: function (/*msg*/) {
      //$("#toast-msg").text(msg);
      //const toast = new bootstrap.Toast($("#liveToast"));
      //toast.show();
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
  margin-bottom: 2em;
}

.tileRow {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: math.div(8vmin, 8);
}
</style>
