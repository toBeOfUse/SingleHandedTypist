<template>
  <div
    style="
      height: 36px;
      border-radius: 4px;
      border: 1px solid black;
      position: relative;
      transition: transform 20ms linear;
    "
    :style="{
      width: `${36 * (widthRatio ?? 1)}px`,
      transform: isPressed ? 'translateY(2px)' : 'translate(0px)',
      boxShadow: `-3px ${isPressed ? '1px' : '3px'} 0 ${shadowColor}`,
    }"
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
  shadowColor: string;
  widthRatio?: number;
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
