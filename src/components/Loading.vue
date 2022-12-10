<template>
  <div class="loading">
    <font-awesome-icon :size="'10x'" :spin="true" icon="fa-solid fa-spinner" />
  </div>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: transparent;
  color: #ffffff;
}
</style>