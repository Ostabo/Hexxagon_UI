<template>
  <div class="menu-container">
    <h1 class="heading">Hexxagon</h1>
    <h2 class="heading">Menu</h2>
    <RouterLink class="router-link" to="/singleplayer">SINGLEPLAYER</RouterLink>
    <RouterLink class="router-link" to="/multiplayer">MULTIPLAYER</RouterLink>
    <RouterLink class="router-link" to="/about">ABOUT</RouterLink>
    <div class="menu-button-wrapper">
      <IconButton icon="fa-solid fa-gear" @click="toggleSettings"> </IconButton>
      <IconButton icon="fa-solid fa-info" @click="toggleAbout"> </IconButton>
      <IconButton icon="fa-brands fa-github" @click="openGithub"> </IconButton>
      <IconButton icon="fa-solid fa-volume-high" @click="soundToggle">
      </IconButton>
    </div>
  </div>
</template>

<script>
import IconButton from "@/components/IconButton.vue";

export default {
  name: "MenuView",
  components: { IconButton },
  methods: {
    toggleSettings() {},
    toggleAbout() {},
    openGithub() {
      window.open("https://github.com/Ostabo/Hexxagon-WA");
    },
    soundToggle() {},
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/main.scss";

.heading {
  text-align: center;
  text-shadow: black 1px 1px 1em;

  &:nth-child(1) {
    font-size: 6rem;
    color: $color-primary;
  }

  &:nth-child(2) {
    font-size: 4rem;
    color: $color-secondary;
    padding-bottom: 1rem;
    margin-top: -8vh;
  }
}

.menu-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 50vw;
}

.router-link {
  display: block;
  text-align: center;
  font-size: 4rem;
  font-weight: bold;
  text-decoration: none;
  margin: 1rem;
  padding: 1rem;
  width: 100%;
  border-radius: 1rem;

  color: $color-bright;
  border: 2px solid $color-bright;

  &:hover {
    border: 2px solid $color-secondary;
    color: $color-secondary;
  }
}

.menu-button-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
