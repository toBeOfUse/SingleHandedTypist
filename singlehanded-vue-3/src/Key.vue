<template>
  <div
    style="
      height: 36px;
      width: 36px;
      border-radius: 4px;
      border: 1px solid black;
      position: relative;
      transition: transform 20ms linear;
    "
    :style="{ transform: isPressed ? 'translate(-3px, 2px)' : 'translate(0px, 0px)' }"
  >
    <span
      style="position: absolute; left: 13%; top: 9%"
      :style="{ opacity: secondariesActive ? 0.5 : 1 }"
      >{{ primaryLetter }}</span
    >
    <span
      style="position: absolute; right: 13%; bottom: 9%"
      :style="{ opacity: secondariesActive ? 1 : 0.5 }"
      >{{ secondaryLetter }}</span
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{
  primaryLetter: string;
  secondaryLetter: string;
  isPressed: boolean;
  secondariesActive: boolean;
}>();
</script>

<style lang="scss" scoped>
* {
  cursor: default;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
