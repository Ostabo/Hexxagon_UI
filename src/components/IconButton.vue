<template>
  <button class="icon-button">
    <font-awesome-icon :icon="icon" :size="'3x'" />
  </button>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "IconButton",
  components: { FontAwesomeIcon },
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/main.scss";

button {
  display: block;
  background: transparent;
  border: 1px solid $color-bright;
  min-width: 10vw;
  min-height: 10vh;
  padding: 2vmin;
  margin: 1em;
  border-radius: 1em;

  color: $color-bright;

  &:hover {
    border: 1px solid $color-secondary;
    color: $color-secondary;
  }
}
</style>
