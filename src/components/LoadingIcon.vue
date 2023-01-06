<template>
  <div class="loading">
    <font-awesome-icon
      v-if="!error"
      :size="'10x'"
      :spin="true"
      icon="fa-solid fa-spinner"
    />
    <font-awesome-icon
      v-else-if="error"
      :size="'10x'"
      class="fa-fade"
      icon="fa-solid fa-bolt-lightning"
    />
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "LoadingIcon",
  components: { FontAwesomeIcon },
  props: {
    error: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 86vh;
  width: 100vw;
  background: transparent;
  color: #ffffff;
}
</style>
