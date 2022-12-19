<template>
  <WebFrame>
    <main>
    <textarea class="textfield" disabled>
      {{ game }}
    </textarea>
    </main>
  </WebFrame>
</template>

<script>
import { SERVER_URL } from "@/main";
import WebFrame from "@/views/WebFrame.vue";

export default {
  name: "GamePlain",
  components: { WebFrame },
  data() {
    return {
      game: ""
    };
  },
  mounted() {
    fetch(`http://${SERVER_URL}/game-plain`, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.ok) {
        return res.text();
      }
    }).then(res => {
      this.game = res;
    }).catch(err => {
      this.game = err;
    });
  }
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;

  & > textarea {
    background: transparent;
    overflow-y: hidden;
  }
}
</style>