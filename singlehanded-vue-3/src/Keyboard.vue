<template>
  <div style="display: flex; gap: 5px">
    <template v-if="side === 'left'">
      <Key
        v-for="k in leftToRight"
        :primary-letter="k[0]"
        :secondary-letter="k[1]"
        :secondaries-active="secondariesActive"
        :is-pressed="pressedKeys.includes(k[0])"
      />
    </template>
    <template v-if="side === 'right'">
      <Key
        v-for="k in leftToRight"
        :primary-letter="k[1]"
        :secondary-letter="k[0]"
        :secondaries-active="secondariesActive"
        :is-pressed="pressedKeys.includes(k[0])"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import Key from "./Key.vue";
import { leftToRight } from "./data";

defineProps<{
  side: "left" | "right";
  pressedKeys: string[];
  secondariesActive: boolean;
}>();
</script>
