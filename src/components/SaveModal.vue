<template>
  <div
    id="saveModal"
    aria-hidden="true"
    aria-labelledby="saveModalLabel"
    class="modal fade"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="loadModalLabel" class="modal-title fs-5">Success</h1>
          <button
            aria-label="Close"
            class="btn-close"
            data-bs-dismiss="modal"
            type="button"
            @click="save"
          ></button>
        </div>
        <div class="modal-body">
          <p>Your game has been saved!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiPost } from "@/assets/api";

export default {
  name: "SaveModal",
  methods: {
    save: function () {
      apiPost("save");
    },
  },
};
</script>

<style scoped></style>
