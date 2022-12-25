<template>
  <v-dialog>
    <v-card class="mx-auto" color="grey-darken-4">
      <v-card-title class="headline">GAME OVER</v-card-title>
      <v-card-text>
        <h5 class="modal-title" id="game-over-content">
          {{ winner === 0 ? "It's a tie!" : "Player " + winner + " wins!" }}
        </h5><br>

        To start a new game, click on the reset button in the action menu.
        Thanks for playing!
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn variant="outlined" @click="reset">Reset</v-btn>
        <v-btn @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { apiPost } from "@/assets/api";

export default {
  name: "GameOverModal",
  props: {
    winner: {
      type: Number,
      required: true,
    }
  },
  methods: {
    reset: function () {
      apiPost("reset").then((res) => {
            if (res.ok) {
              location.reload();
            }
          });
    },
    close: function () {
      this.$emit("close");
    }
  },
};
</script>
