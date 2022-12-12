<template>
  <div class="stone">
    <font-awesome-icon v-if="player==='X'" :size="'1x'" icon="fa-solid fa-gem" />
    <font-awesome-icon v-if="player==='O'" :size="'1x'" icon="fa-regular fa-gem" />
  </div>
</template>

<script>
export default {
  name: "Stone",
  props: {
    player: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>

</style>