<template>
  <div class="modal fade" id="saveModal" tabindex="-1" aria-labelledby="saveModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="loadModalLabel">Success</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                  onclick="doAction('save')"></button>
        </div>
        <div class="modal-body">
          <p>Your game has been saved!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SaveModal"
};
</script>

<style scoped>

</style>