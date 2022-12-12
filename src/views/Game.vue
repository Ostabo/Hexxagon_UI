<template>
  <Loading v-if="loading"></Loading>
  <main v-else class="container">
    <div class="header">
      <h2 class="counter">
        <Stone :player="1"></Stone>
        :
        <span>{{ counter1 }}</span>
      </h2>
      <h2 class="status">
        {{ gameStatus }}
      </h2>
      <h2 class="counter">
        <Stone :player="2"></Stone>
        :
        <span>{{ counter2 }}</span>
      </h2>
    </div>
    <!--<div v-for="(row, indexR) in game"
         :key="row"
         class="row">
      <HexTile v-for="(tile, indexT) in row"
               :key="tile"
               ref="hex"
               :stone="tile"
               @click="clickTile(indexR, indexT)"></HexTile>
    </div>-->
  </main>
</template>

<script>
import HexTile from "@/components/HexTile.vue";
import Stone from "@/components/Stone.vue";
import { Field, FieldResponse } from "@/assets/classes";
import Loading from "@/components/Loading.vue";

export const statusText = [
  "GAME OVER",
  "Your turn",
  "Waiting for other player...",
  "You are spectator"
];
export const WS_PLAYER_REQUEST = "Requesting player number";
export const WS_PLAYER_RESPONSE = "Player number: ";
export const WS_KEEP_ALIVE_RESPONSE = "Keep alive";
export const WS_KEEP_ALIVE_REQUEST = "ping";
export const SERVER_URL = "localhost:9000";

export default {
  name: "Game",
  components: { Loading, Stone, HexTile },
  data() {
    return {
      socket: undefined,
      loading: Boolean,
      counter1: Number,
      counter2: Number,
      gameStatus: String,
      playerNumber: String,
      game: new Field(1, 1, [])
    };
  },
  mounted() {
    fetch("http://" + SERVER_URL + "/game", {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Something went wrong");
      }
    }).then(json => {
      this.updateGame(json);
      this.loading = false;
    }).catch(err => {
      console.log(err);
    });

    this.socket = new WebSocket("ws://" + SERVER_URL + "/ws");

    this.socket.onopen = () => {
      console.log("WebSocket connection established");
      this.socket.send(WS_PLAYER_REQUEST);

      setInterval(() => this.socket.send(WS_KEEP_ALIVE_REQUEST), 20000); // ping every 20 seconds
    };

    this.socket.onmessage = (event) => {
      let msg = event.data;

      if (msg.startsWith(WS_PLAYER_RESPONSE)) {
        this.playerNumber = msg.split(" ")[2];
        console.log(`${WS_PLAYER_RESPONSE} ${this.playerNumber}`);
        this.initStatus();
      } else if (msg === WS_KEEP_ALIVE_RESPONSE) {
        console.log("[ping] " + msg);
      } else {
        const json = JSON.parse(msg);
        this.updateGame(FieldResponse.from(json));
      }
    };

    this.socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        console.log("[close] Connection died");
      }
    };

    this.socket.onerror = (error) => {
      console.error(`[error] ${error.message}`);
    };
  },
  beforeUnmount() {
    if (this.socket)
      this.socket.close();
  },
  methods: {
    clickTile: async function(element) {
      switch (this.playerNumber) {
        case "1":
        case "2":
          const availableTurns = ["X", "O"];
          const [x, y] = element.id.toString().split(",");
          const req = `/place/${x}/${y}/${availableTurns[this.playerNumber - 1]}`;
          await this.doAction(req);
          break;
        default:
          this.triggerToast(statusText[3]);
      }
    },

    doAction: async function(action) {
      const res = await fetch(action, {
        method: "POST",
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: ""
      });

      if (res.ok)
        this.socket.send(`Action done: ${action} -> Response: ${await res.text()}`);
      else
        this.triggerToast(await res.text());
    },

    updateGame: function(fieldRes) {
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

    gameOver: function() {
      //const content = $("#game-over-content");

      //if (counter1 > counter2)
      //  content.text("Player 1 🔷 wins!");
      //else if (counter2 > counter1)
      //  content.text("Player 2 🔴 wins!");
      //else
      //  content.text("It's a draw! ⚪");

      //$("#gameOverModal").modal("show");
    },

    initStatus: function() {
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

    updateStatus: function(turn) {
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

    updateCounter: function(json) {
      // update the page elements
      this.counter1 = json.xcount;
      this.counter2 = json.ocount;
    },

    updateField: function(json) {
      this.game = new Field(json.field.rows, json.field.cols, json.field.cells);
    },

    triggerToast: function(msg) {
      //$("#toast-msg").text(msg);
      //const toast = new bootstrap.Toast($("#liveToast"));
      //toast.show();
    }
  }
};
</script>

<style scoped>

</style>