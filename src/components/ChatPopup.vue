<template>
  <div id="chat" class="card">
    <div
      class="card-header d-flex justify-content-between align-items-center p-3"
    >
      <h5 class="mb-0">Chat</h5>
    </div>
    <div
      id="chat-box"
      class="card-body position-relative d-inline-flex"
      data-bs-perfect-scrollbar="true"
    ></div>
    <div
      class="card-footer text-muted d-flex justify-content-between align-items-center p-3"
    >
      <input
        id="chat-input"
        class="form-control w-100"
        placeholder="Type message"
        type="text"
        v-on:keyup.enter="sendChatMsg"
      />
      <button class="btn btn-light ms-3" v-on:click="sendChatMsg">
        <font-awesome-icon class="mt-1" icon="paper-plane" size="1x">
        </font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

let previousText = "";
let noError = false;

export default {
  name: "ChatPopup",
  mounted() {
    this.initChat();
  },
  methods: {
    initChat() {
      axios
        .get("http://localhost:9000/chat")
        .then((response) => {
          if (response.status === 200) {
            let res = response.data.toString();
            if (res !== previousText && res !== "") {
              console.log("Response: " + response.data);
              this.updateChat(res);
              previousText = res;
            }
          }
        })
        .finally(() => {
          if (noError) {
            setTimeout(() => {
              this.initChat();
            }, 200);
          } else {
            this.initChat();
          }
          noError = false;
        });
    },

    async sendChatMsg() {
      let input = document.getElementById("chat-input");
      let msg = input.value;
      input.value = "";

      axios
        .post("http://localhost:9000/chat", {
          message: msg,
        })
        .then((response) => {
          if (response.status === 200) {
            if (response.data !== previousText) {
              this.updateChat(response.data);
              previousText = response.data;
            }
            input.focus();
          }
        })
        .catch((error) => {
          console.log("Error: " + error);
          noError = true;
        });
    },

    updateChat(msg) {
      const timestamp = new Date().toLocaleTimeString();
      let chatbox = document.getElementById("chat-box");

      let message = document.createElement("div");
      message.classList.add(
        "small",
        "p-2",
        "border-top",
        "border-secondary",
        "d-inline-flex",
        "justify-content-between"
      );

      let msgText = document.createElement("div");
      msgText.classList.add("text-left");
      msgText.innerHTML = msg;

      let msgTime = document.createElement("div");
      msgTime.classList.add("text-right", "text-muted");
      msgTime.innerHTML = timestamp;

      message.appendChild(msgText);
      message.appendChild(msgTime);

      chatbox.append(message);
    },
  },
};
</script>

<style scoped>
#chat .card-body {
  overflow-x: hidden;
  overflow-y: scroll;

  flex-direction: column;
  min-width: 15vw;
  height: 30vh;
}
</style>
