<template>
  <span class="stone">
    <img v-if="player === 'X'" alt="X" src="@/assets/images/gem-blue.png" />
    <img v-if="player === 'O'" alt="O" src="@/assets/images/gem-red.png" />
  </span>
</template>

<script>
export default {
  name: "PlayerStone",
  props: {
    player: {
      type: String,
      required: true,
    },
  },
  computed: {
    color() {
      return this.player === "X"
        ? "blue"
        : this.player === "O"
        ? "red"
        : "white";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/main.scss";

.stone img {
  width: 6vmin;
  margin: 0 0 5px 2px;
  object-fit: contain;
  filter: drop-shadow(0 0 1px $color-darker);
}
</style>
