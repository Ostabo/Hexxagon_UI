<template>
  <div
    id="loadModal"
    aria-hidden="true"
    aria-labelledby="loadModalLabel"
    class="modal fade"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="loadModalLabel" aria-label="Load Modal" class="modal-title fs-5">Are you sure?</h1>
          <button
            aria-label="Close Load"
            class="btn-close"
            data-bs-dismiss="modal"
            type="button"
          ></button>
        </div>
        <div class="modal-body">
          <p>Loading a game will override your current game progress.</p>
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
            @click="load()"
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
  name: "LoadModal",
  methods: {
    load: function() {
      apiPost("load").then(() => {
        window.location.reload();
      });
    }
  }
};
</script>

<style scoped></style>
