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
      type: 1 | 2,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>

.hex {
  background: white;
  text-align: center;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

</style>