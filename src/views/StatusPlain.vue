<template>
  <WebFrame>
    <main>
      <textarea class="textfield" disabled>
        {{ status }}
      </textarea>
    </main>
  </WebFrame>
</template>

<script>
import WebFrame from "@/views/WebFrame.vue";
import { SERVER_URL } from "@/main";

export default {
  name: "StatusPlain",
  components: { WebFrame },
  data() {
    return {
      status: ""
    };
  },
  mounted() {
    fetch(`http://${SERVER_URL}/status-plain`, {
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
      this.status = res;
    }).catch(err => {
      this.status = err;
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