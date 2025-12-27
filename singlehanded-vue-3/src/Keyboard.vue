<template>
  <!-- TODO: reduce duplication once final result takes shape -->
  <div class="keyboard">
    <template v-if="side === 'left'">
      <div class="row" v-for="(row, i) in keyboard">
        <Key
          v-for="(k, j) in row"
          :width-ratio="j === 0 ? leftKeyWidthRatios[i] : 1"
          :primary-letter="k[0]"
          :secondary-letter="k[1]"
          :secondaries-active="secondariesActive"
          :is-pressed="pressedKeys.includes(k[0].toUpperCase())"
          :shadow-color="pastelColors[i]!"
        />
      </div>
    </template>
    <template v-if="side === 'right'">
      <div class="row" v-for="(row, i) in keyboard">
        <Key
          v-for="k in row"
          :primary-letter="k[1]"
          :secondary-letter="k[0]"
          :secondaries-active="secondariesActive"
          :is-pressed="pressedKeys.includes(k[1].toUpperCase())"
          :shadow-color="pastelColors[i]!"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import Key from "./Key.vue";
import { keyboard } from "./data";

const pastelColors = ["#eebdff", "#c7ffbd", "#ffc9c9", "#c9dfff"];
const leftKeyWidthRatios = [0.8, 1, 1.3, 1.5];

defineProps<{
  side: "left" | "right";
  pressedKeys: string[];
  secondariesActive: boolean;
}>();
</script>

<style scoped lang="scss">
.keyboard {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.row {
  display: flex;
  gap: 8px;
}
</style>
