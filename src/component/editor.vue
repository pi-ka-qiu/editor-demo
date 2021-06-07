<template>
    <div class="editor"></div>
</template>

<script>
import Editor from '../lib/browser-editor/browser-editor';
import '../lib/browser-editor/browser-editor.scss';

export default {
  name: 'editor',
  mounted() {
    const editor = new Editor(this.$el, { placeholder: '输入写什么' });
    console.log(editor);
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
