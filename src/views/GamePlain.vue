<template>
  <WebFrame>
    <main>
      <textarea class="textfield" v-model="game" disabled> </textarea>
    </main>
  </WebFrame>
</template>

<script>
import WebFrame from "@/views/WebFrame.vue";
import { apiGet } from "@/assets/api";

export default {
  name: "GamePlain",
  components: { WebFrame },
  data() {
    return {
      game: "",
    };
  },
  mounted() {
    apiGet("game-plain")
      .then((res) => {
        if (res.ok) {
          return res.text();
        }
      })
      .then((res) => {
        this.game = res;
      })
      .catch((err) => {
        this.game = err;
      });
  },
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
