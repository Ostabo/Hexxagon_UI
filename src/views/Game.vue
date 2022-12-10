<template>

  <div v-for="row in board" :key="row" class="row">
    <HexTile v-for="tile in row" :key="tile" :stone="tile"></HexTile>
  </div>

</template>

<script>
import HexTile from "@/components/HexTile.vue";

export default {
  name: "Game",
  components: { HexTile },
  data() {
    return {}; // implement logic here
  }
};
</script>

<style scoped>

</style>