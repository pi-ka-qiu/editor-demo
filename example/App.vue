<template>
  <div id="app">
    <editor-tree></editor-tree>
  </div>
</template>

<script>
import editorTree from '../src/editor-tree.vue';

export default {
  name: 'app',
  components: {
    editorTree,
  },
  created() {
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
