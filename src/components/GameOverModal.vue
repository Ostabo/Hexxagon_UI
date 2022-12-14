<template>
  <div class="modal fade" id="gameOverModal" tabindex="-1" aria-labelledby="gameOverModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header border-bottom">
          <h4 class="modal-title">
            GAME OVER
          </h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h5 class="modal-title" id="game-over-content"></h5>
          <br>To start a new game, click on the reset button in the action menu.
          Thanks for playing!
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-light text-dark" aria-label="Reset" data-bs-dismiss="modal"
                  onclick="doAction('reset');">
            Reset</button>
          <button type="button" class="btn btn-outline-light text-light" aria-label="Close" data-bs-dismiss="modal">
            Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameOverModal"
};
</script>

<style scoped>

</style>