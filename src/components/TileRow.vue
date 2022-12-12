<template>
  <div class="tileRow">
    <HexTile v-for="tile in 9"
             :key="tile"
             ref="hex"
             :stone="1"
              @click="clickTile">
    </HexTile>
  </div>
</template>

<script>
  import HexTile from "@/components/HexTile.vue";
  import {Field} from "../assets/classes";

  export default {
    name: "TileRow",
    components: { HexTile },
    props: {
      row: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        field: new Field()
      };
    },
    methods: {
      clickTile(tile) {
        this.$emit("clickTile", tile);
      }
    }
  };

</script>

<style lang="scss">
  .tileRow {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8vmin / 8;
  }
</style>