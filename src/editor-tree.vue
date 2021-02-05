<template>
  <div>
    <tree ref="tree"></tree>
    <editor></editor>
    <context-menu v-show="contextMenuShow"></context-menu>
  </div>
</template>

<script>
import ContextMenu from '@/component/context-menu.vue';
import tree from './component/tree.vue';
import editor from './component/editor.vue';

function rightClick(e) {
  console.log(e);
}

export default {
  name: 'editor-tree',
  components: { ContextMenu, tree, editor },
  data() {
    return {
      contextMenuShow: false,
    };
  },
  methods: {
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.tree.$el) {
        this.$refs.tree.$el.oncontextmenu = (event) => {
          this.contextMenuShow = true;
          rightClick(event);
        };
      }
    });
  },
};
</script>

<style scoped>

</style>
