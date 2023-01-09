<template>
  <span ref="stone" class="stone">
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
      required: true
    }
  },
  data() {
    return {
      timer: null
    };
  },
  watch: {
    player: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.triggerAnimation();
      }
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
  },
  methods: {
    triggerAnimation() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.$refs.stone.classList.remove("changeStone");
      this.$refs.stone.classList.add("changeStone");
      this.timer = setTimeout(() => {
        this.$refs.stone.classList.remove("changeStone");
      }, 750);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/main.scss";

.stone:is(.changeStone) img {
  animation: changeStone .75s;
}

.stone {
  -webkit-perspective: 1000px;
  perspective: 1000px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.stone img {
  width: 6vmin;
  object-fit: contain;
  filter: drop-shadow(0 0 1px $color-darker);
  -webkit-user-select: none;
  user-select: none;

  @media (max-width: 600px) {
    margin: 0 0 1px 1px;
  }
  @media (min-width: 600px) {
    margin: 0 0 5px 2px;
  }
}

@keyframes changeStone {
  0% {
    rotate: y 0deg;
    scale: 1;
  }
  50% {
    rotate: y 180deg;
    scale: 1.2;
  }
  100% {
    rotate: y 360deg;
    scale: 1;
  }
}
</style>
