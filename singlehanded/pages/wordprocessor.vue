<template>
  <div class="flex flex-col p-5 max-w-lg m-auto max-h-screen">
    <h1 class="text-2xl font-bold">One-Handed Word Processor</h1>
    <div class="flex flex-row block my-4">
      <button @click="editor && editor.chain().focus().toggleBold().run()">
        Bold
      </button>
      <button @click="editor && editor.chain().focus().toggleItalic().run()">
        Italic
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
        h1
      </button>
    </div>
    <client-only>
      <editor-content :editor="editor" />
    </client-only>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import keymap from "./keymap.js";

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
    };
  },

  mounted() {
    this.editor = new Editor({
      content: `<h1>Try it out!</h1><p>This rich text editor will let you practice your one-handed typing skills.
        Remember, as you hold space, the keyboard is mirrored and the letters you would normally type with your
        left hand should now be typed with your right - and vice versa. The mirrored layout means that you can
        transfer your muscle memory from e.g. your left pinky to your right pinky - surprisingly smoothly.</p>
        <p>Try typing some text below this:</p><p></p>`,
      extensions: [StarterKit],
    });

    const type = (text) => {
      this.editor.commands.insertContent(text);
    };

    const backspace = () => {
      const cursorPos = this.editor.view.state.selection.from;
      this.editor.commands.setTextSelection({
        from: cursorPos - 1,
        to: cursorPos,
      });
      this.editor.commands.deleteSelection();
    };

    let space = false;
    let usedSpace = false;
    function keyListener(event) {
      if (
        (event.key != " " && !(event.key in keymap)) ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
      if (event.key == " ") {
        if (event.type == "keydown" && !space) {
          space = true;
          type(" ");
        } else if (event.type == "keyup") {
          space = false;
          usedSpace = false;
        }
      } else if (event.type == "keydown") {
        if (space) {
          if (!usedSpace) {
            usedSpace = true;
            backspace();
          }
          type(keymap[event.key]);
        } else {
          type(event.key);
        }
      }
      console.log(space);
    }
    window.addEventListener("keydown", keyListener, true);
    window.addEventListener("keyup", keyListener, true);
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style scoped>
button {
  background-color: lightgray;
  border-radius: 3px;
  margin: 2px;
  padding: 2px;
  border: 1px solid black;
}
</style>

<style>
.ProseMirror {
  width: 100%;
  min-height: 200px;
  border: 1px solid black;
  border-radius: 3px;
  padding: 2px;
}
.ProseMirror h1 {
  font-size: 150%;
}
.ProseMirror p {
  margin: 5px 0;
}
</style>