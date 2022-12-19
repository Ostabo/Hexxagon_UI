<template>
  <div
    v-if="shown"
    aria-hidden="true"
    aria-labelledby="gameOverModalLabel"
    class="modal fade"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-bottom">
          <h4 class="modal-title">GAME OVER</h4>
          <button
            aria-label="Close"
            class="btn-close"
            data-bs-dismiss="modal"
            type="button"
          ></button>
        </div>
        <div class="modal-body">
          <h5 id="game-over-content" class="modal-title">{{ msg }}</h5>
          <br />To start a new game, click on the reset button in the action
          menu. Thanks for playing!
        </div>
        <div class="modal-footer justify-content-center">
          <button
            aria-label="Reset"
            class="btn btn-light text-dark"
            data-bs-dismiss="modal"
            type="button"
            @click="reset"
          >
            Reset
          </button>
          <button
            aria-label="Close"
            class="btn btn-outline-light text-light"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiPost } from "@/assets/api";

export default {
  name: "GameOverModal",
  props: {
    shown: {
      type: Boolean,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
  },
  methods: {
    reset: function () {
      apiPost("reset");
    },
  },
};
</script>

<style scoped></style>
