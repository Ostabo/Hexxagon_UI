<template>
  <div class="stone">
    <font-awesome-icon v-if="player===1" :size="'1x'" icon="fa-solid fa-gem" />
    <font-awesome-icon v-else :size="'1x'" icon="fa-regular fa-gem" />
  </div>
</template>

<script>
export default {
  name: "Stone",
  props: {
    player: {
      type: 1 | 2,
      required: true
    }
  }
};
</script>

<style scoped>

</style>