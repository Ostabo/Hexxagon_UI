<template>
  <div class="hex">
    <Stone :player="stone"></Stone>
  </div>
</template>

<script>
import Stone from "@/components/Stone.vue";

export default {
  name: "HexTile",
  components: { Stone },
  props: {
    stone: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@use "sass:math";

.hex {
  background: white;
  text-align: center;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);

  width: 1.1 * 8vmin;
  height: 8vmin;
  text-shadow: black 0 1.6px 1.6px;
  line-height: 8vmin;
  font-size: math.div(8vmin, 2);
  transition: all .1s linear;

  margin-left: math.div(-1 * 8vmin, 8);

  &:nth-child(odd) {
    margin-top: math.div(8vmin * -1 - 8vmin, 10) !important;
  }

  &:hover {
    cursor: pointer;
    scale: 1.1;
  }
}
</style>