<template>
  <div ref='editorManager'></div>
</template>
<script>
import Editor from './editor.vue';
import Vue from 'vue';

const EditorComponent = Vue.extend(Editor);
export default {
  name: 'editor-manager',
  data() {
    return {
      editorMap: {},
    };
  },
  methods: {
    getEditor(filePath) {
      return this.editorMap[filePath];
    },
    createEditor(filePath) {
      if (!filePath) return;
      const key = filePath;
      if (this.editorMap[key]) return this.editorMap[key];

      const editor = new EditorComponent({
        propsData: {},
      }).$mount();
      this.$refs.editorManager.appendChild(editor.$el);
      this.editorMap[key] = editor;
      return editor;
    },
  },
};
</script>

<style scoped></style>
