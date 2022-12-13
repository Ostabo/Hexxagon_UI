<template>
  <span class="stone">
    <font-awesome-icon
      v-if="player === 'X'"
      :size="'1x'"
      icon="fa-solid fa-gem"
    />
    <font-awesome-icon
      v-if="player === 'O'"
      :size="'1x'"
      icon="fa-regular fa-gem"
    />
  </span>
</template>

<script>
export default {
  name: "PlayerStone",
  props: {
    player: {
      type: String,
      required: true
    }
  },
  computed: {
    color() {
      return this.player === "X"
        ? "blue"
        : this.player === "O"
          ? "red"
          : "white";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/main.scss";

.stone {
  color: v-bind(color);
  filter: drop-shadow(0 0 0.5em v-bind(color));
}
</style>
