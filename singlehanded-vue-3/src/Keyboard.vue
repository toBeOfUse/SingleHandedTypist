<template>
  <template v-if="side === 'left'">
    <Key primary-letter="A" secondary-letter=";" :is-pressed="false" :secondaries-active="false" />
  </template>
  <template v-if="side === 'right'">
    <Key primary-letter=";" secondary-letter="A" :is-pressed="false" :secondaries-active="false" />
  </template>
</template>

<script lang="ts" setup>
import Key from "./Key.vue";

defineProps<{
  side: "left" | "right";
}>();

// TODO: construct pairs of corresponding keys in an array of arrays
</script>
