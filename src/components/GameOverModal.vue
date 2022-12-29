<template>
  <v-dialog>
    <v-card class="mx-auto text-center hexa">
      <v-card-title class="headline text-h4 py-lg-3">GAME OVER</v-card-title>
      <v-card-subtitle class="text-h5 py-lg-1">
        {{ winner === 0 ? "It's a tie!" : "Player " + winner + " wins!" }}
      </v-card-subtitle>
      <v-card-text>
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
    },
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
    },
  },
};
</script>

<style lang="scss" scoped>
.hexa *:is(.text-h4, .text-h5) {
  font-family: Hexa, serif !important;
}
</style>
