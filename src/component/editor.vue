<template>
  <div class="c-editor"></div>
</template>

<script>
import Editor from '../lib/browser-editor/browser-editor';
import '../lib/browser-editor/browser-editor.scss';
import rowSupport from '../lib/plugin/row-support/row-support-api.ts';
import rowSupportRender from '../lib/plugin/row-support/row-support-render.ts';

export default {
  name: 'editor',
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const editor = new Editor(this.$el, { placeholder: '输入些什么' });
    editor.use(rowSupport());
    editor.use(rowSupportRender());
    this.editor = editor;
    editor.onInput(() => {
      this.$emit('input', this.getValue());
    });
    window.t = this.editor;
  },
  destroyed() {
    this.editor = undefined;
  },
  methods: {
    getValue() {
      return this.editor.getValue();
    },
    setValue(value) {
      return this.editor.setValue(value);
    },
  },
};
</script>

<style scoped>
.c-editor {
  height: 200px;
}
</style>
