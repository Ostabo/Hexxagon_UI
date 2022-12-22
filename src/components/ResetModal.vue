<template>
  <div
    id="resetModal"
    aria-hidden="true"
    aria-labelledby="resetModalLabel"
    class="modal fade"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="resetModalLabel" class="modal-title fs-5">Are you sure?</h1>
          <button
            aria-label="Close"
            class="btn-close"
            data-bs-dismiss="modal"
            type="button"
          ></button>
        </div>
        <div class="modal-body">
          <p>You will lose your current game progress.</p>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            type="button"
          >
            Close
          </button>
          <button
            class="btn btn-primary"
            data-bs-dismiss="modal"
            type="button"
            @click="reset()"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiPost } from "@/assets/api";

export default {
  name: "ResetModal",
  methods: {
    reset: function () {
      apiPost("reset").then((res) => {
        if (res.ok) {
          location.reload();
        }
      });
    },
  },
};
</script>

<style scoped></style>
