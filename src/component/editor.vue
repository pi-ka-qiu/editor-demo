<template>
    <div class="editor"></div>
</template>

<script>
import Editor from '../lib/browser-editor/browser-editor';
import '../lib/browser-editor/browser-editor.scss';

export default {
  name: 'editor',
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const editor = new Editor(this.$el, { placeholder: '输入些什么' });
  },
  methods: {
  },
};
</script>

<style scoped>
.editor{
  height: 200px;
}
</style>
