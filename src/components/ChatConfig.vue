<template>
  <button
    class="btn btn-light dropdown-item"
    type="button"
    @click="toggleChat()"
  >
    <font-awesome-icon
      v-if="chatToggle"
      class="text-black"
      fixed-width
      icon="wifi"
      size="lg"
    >
    </font-awesome-icon>
    <font-awesome-layers v-else-if="!chatToggle" class="pr-lg-6">
      <font-awesome-icon fixed-width icon="wifi" size="lg" />
      <font-awesome-icon class="text-red" fixed-width icon="x" size="lg" />
    </font-awesome-layers>
    Chat
  </button>
</template>

<script>
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
} from "@fortawesome/vue-fontawesome";

export default {
  name: "ChatConfig",
  components: { FontAwesomeLayers, FontAwesomeIcon },
  props: {
    chatToggle: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    toggleChat() {
      this.$emit("toggleChat");
    },
  },
};
</script>

<style scoped></style>
