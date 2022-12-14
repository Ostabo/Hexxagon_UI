<template>
  <div id="chat" class="card">
    <div class="card-header d-flex justify-content-between align-items-center p-3">
      <h5 class="mb-0">Chat</h5>
    </div>
    <div id="chat-box" class="card-body position-relative d-inline-flex" data-bs-perfect-scrollbar="true">
    </div>
    <div class="card-footer text-muted d-flex justify-content-between align-items-center p-3">
      <input id="chat-input" class="form-control w-100" placeholder="Type message" type="text">
      <button class="btn btn-light ms-3" onclick="sendChatMsg()">
        <font-awesome-icon
          class="mt-1"
          icon="paper-plane"
          size="1x">
        </font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatPopup",
  methods: {
    sendChatMsg() {
      // TODO
    }
  }
};
</script>

<style scoped>

</style>