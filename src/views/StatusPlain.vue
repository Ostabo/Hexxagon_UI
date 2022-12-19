<template>
  <WebFrame>
    <main>
      <textarea v-model="status" class="textfield" disabled> </textarea>
    </main>
  </WebFrame>
</template>

<script>
import WebFrame from "@/views/WebFrame.vue";
import { apiGet } from "@/assets/api";

export default {
  name: "StatusPlain",
  components: { WebFrame },
  data() {
    return {
      status: "",
    };
  },
  mounted() {
    apiGet("status-plain")
      .then((res) => {
        if (res.ok) {
          return res.text();
        }
      })
      .then((res) => {
        this.status = res;
      })
      .catch((err) => {
        this.status = err;
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
