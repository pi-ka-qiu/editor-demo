<template>
  <div class="c-editor-layout">
    <div class="c-editor-layout-header" ref="top"></div>
    <div class="c-editor-layout-content">
      <div class="c-editor-layout-left" ref="left"></div>
      <div class="c-editor-layout-right" ref="right"></div>
    </div>
    <div class="c-editor-layout-footer"></div>
  </div>
</template>

<script>
import Editor from '../lib/browser-editor/browser-editor';
import '../lib/browser-editor/browser-editor.scss';
import rowSupport from '../lib/plugin/row-support/row-support-api.ts';
import barRender from '../lib/plugin/bar/bar-render.ts';
import rowSupportRender from '../lib/plugin/row-support/row-support-render.ts';

export default {
  name: 'editor',
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const editor = new Editor(this.$refs.right, { placeholder: '输入些什么' });
    editor.use(barRender({ el: this.$refs.top }));
    editor.use(rowSupport());
    editor.use(rowSupportRender({ el: this.$refs.left }));
    this.editor = editor;
    editor.onInput(() => {
      this.$emit('input', this.getValue());
    });
    editor.onBlur(() => {
      this.$emit('blur', this.getValue());
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

<style scoped lang="scss">
.c-editor-layout {
  display: flex;
  flex-direction: column;
  height: 200px;
  max-width: 400px;
}
.c-editor-layout-content {
  display: flex;
  justify-content: flex-start;
  flex: 1 0;
  .c-editor-layout-left {
  }
  .c-editor-layout-right {
  }
}
</style>
