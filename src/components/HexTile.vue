<template>
  <div class="hex" v-bind:class="hasStone() ? '' : 'hoverable'">
    <Stone :player="stone"></Stone>
  </div>
</template>

<script>
import Stone from "@/components/PlayerStone.vue";

export default {
  name: "HexTile",
  components: { Stone },
  props: {
    stone: {
      type: String,
      required: true
    }
  },
  methods: {
    hasStone() {
      return this.stone === "X" || this.stone === "O";
    }
  }
};
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "../assets/main.scss";

.hex {
  width: 1.1 * 8vmin;
  height: 8vmin;
  background: $color-bright;
  text-shadow: black 0 1.6px 1.6px;
  text-align: center;
  line-height: 8vmin;
  font-size: math.div(8vmin, 2);
  transition: all 0.1s linear;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);

  margin-left: math.div(-1 * 8vmin, 8);

  &:nth-child(odd) {
    margin-top: math.div((8vmin * -1 - 8vmin), 1.75) !important;
  }

}

.hex:not(.hoverable) {
  background: $color-disabled;
}

.hoverable:hover {
  cursor: pointer;
  scale: 1.1;
}

</style>
