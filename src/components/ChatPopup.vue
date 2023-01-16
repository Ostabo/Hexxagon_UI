<template>
  <div id="chat" :class="{ disabled: disabled }" class="card">
    <div
      class="card-header d-flex justify-content-between align-items-center p-3"
    >
      <h5 class="mb-0">Chat</h5>
      <button class="btn btn-light" @click="triggerRefresh()">
        <font-awesome-icon
          :spin="spin"
          icon="refresh"
          size="lg"
          style="--fa-animation-duration: 1.2s"
        />
      </button>
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
        :disabled="disabled"
        class="form-control w-100"
        placeholder="Type message"
        type="text"
        v-on:keyup.enter="sendChatMsg"
      />
      <button
        :disabled="disabled"
        class="btn btn-light ms-3"
        v-on:click="sendChatMsg"
      >
        <font-awesome-icon class="mt-1" icon="paper-plane" size="1x">
        </font-awesome-icon>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { SERVER_URL } from "@/main";

let previousText = "";
let noError = false;

export default {
  name: "ChatPopup",
  components: { FontAwesomeIcon },
  data() {
    return {
      spin: false
    };
  },
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {
    disabled: {
      handler(newVal) {
        if (!newVal) {
          this.initChat();
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.initChat();
  },
  methods: {
    triggerRefresh() {
      this.spin = true;
      setTimeout(() => {
        this.spin = false;
      }, 1000);
      this.initChat();
    },
    initChat() {
      if (this.disabled) return;

      axios
        .get(SERVER_URL + "/chat")
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
          if (this.disabled) return;
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
        .post(SERVER_URL + "/chat", {
          message: msg
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
      msgText.innerText = msg;

      let msgTime = document.createElement("div");
      msgTime.classList.add("text-right", "text-muted");
      msgTime.innerText = timestamp;

      message.appendChild(msgText);
      message.appendChild(msgTime);

      chatbox.append(message);
    }
  }
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

.disabled:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(168, 154, 154, 0.5);
  z-index: 1;
}
</style>
