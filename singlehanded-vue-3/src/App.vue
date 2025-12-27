<script setup lang="ts">
import Keyboard from "./Keyboard.vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { onMounted, ref } from "vue";

const side = ref<"left" | "right">("left");
const secondariesActive = ref(false);
const pressedKeys = ref<string[]>([]);
const layoutContainer = ref<HTMLDivElement | null>(null);
onMounted(() => {
  if (layoutContainer.value) {
    layoutContainer.value?.addEventListener("keydown", (event) => {
      console.log(event);
      if (event.key === " ") {
        secondariesActive.value = true;
      } else {
        const key = event.key.toUpperCase();
        pressedKeys.value.push(key);
      }
      if (secondariesActive.value) {
        event.preventDefault();
      }
    });
    layoutContainer.value?.addEventListener("keyup", (event) => {
      if (event.key === " ") {
        secondariesActive.value = false;
      } else {
        const key = event.key.toUpperCase();
        pressedKeys.value = pressedKeys.value.filter((k) => k !== key);
      }
    });
  } else {
    throw new Error("layout container not mounted");
  }
});
const editorContent = ref("<p>hello!</p>");
</script>

<template>
  <div id="layout" ref="layoutContainer">
    <div id="main-row" :style="{ flexDirection: side === 'left' ? 'row' : 'row-reverse' }">
      <div id="info-column">
        <h1>One-Handed Word Processor</h1>
        <Keyboard
          :side="side"
          :secondaries-active="secondariesActive"
          :pressed-keys="pressedKeys"
        />
      </div>
      <div id="editor-column">
        <QuillEditor theme="snow" v-bind:content="editorContent" content-type="html" />
      </div>
    </div>
    <button
      @click="side = side === 'left' ? 'right' : 'left'"
      style="align-self: center; display: flex; align-items: center; gap: 4px"
    >
      <img
        v-if="side === 'right'"
        style="width: 16px; height: 16px; transform: scaleX(-1)"
        src="/arrow-right-line.svg"
      />
      Switch Hands
      <img v-if="side === 'left'" style="width: 16px; height: 16px" src="/arrow-right-line.svg" />
    </button>
  </div>
</template>

<style scoped lang="scss">
button {
  background-color: white;
  padding: 6px 8px;
  border: 1px solid black;
  box-shadow: -2px 2px 0px #ddd;
  transition: transform 30ms linear, box-shadow 30ms linear;
  border-radius: 9999px;
  &:active {
    transform: translate(-2px, 2px);
    box-shadow: 0px 0px 0px #ddd;
  }
}

/* boring layout stuff */

*,
button {
  font-family: "IBM Plex Sans", sans-serif;
}

#layout {
  padding: 16px;
  height: 100%;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: white;
}

#main-row {
  height: 100%;
  width: 100%;
  display: flex;
  gap: 24px;
}

#info-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  height: 100%;
  width: 50%;
}

#editor-column {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
