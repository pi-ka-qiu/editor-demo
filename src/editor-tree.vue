<template>
    <div>
        <tree></tree>
        <editor></editor>
    </div>
</template>

<script>
import tree from './component/tree.vue';
import editor from './component/editor.vue';

export default {
  name: 'editor-tree',
  components: { tree, editor },
};
</script>

<style scoped>

</style>
