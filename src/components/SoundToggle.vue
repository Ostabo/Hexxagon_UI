<template>
  <button
    class="btn btn-light dropdown-item"
    type="button"
    @click="toggleSound()"
  >
    <font-awesome-icon v-if="soundToggle" class="text-black" icon="volume-high" size="lg">
    </font-awesome-icon>
    <font-awesome-icon v-else-if="!soundToggle" class="text-red" icon="volume-xmark" size="lg">
    </font-awesome-icon>
  </button>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "SoundToggle",
  components: { FontAwesomeIcon },
  props: {
    soundToggle: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggleSound() {
      this.$emit("toggleSound");
    }
  }
};
</script>

<style scoped></style>
