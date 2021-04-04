<template>
  <div>
    <div style="position: relative;width: 200px;">
      <tree ref="tree"></tree>
      <context-menu :position="menuPosition" v-show="contextMenuShow"></context-menu>
    </div>
    <editor></editor>
  </div>
</template>

<script>
import ContextMenu from '@/component/context-menu.vue';
import tree from './component/tree.vue';
import editor from './component/editor.vue';

export default {
  name: 'editor-tree',
  components: { ContextMenu, tree, editor },
  data() {
    return {
      contextMenuShow: false,
      menuPosition: {
        top: '0px',
        left: '0px',
      },
    };
  },
  methods: {
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.tree.$el) {
        this.$refs.tree.$el.oncontextmenu = (event) => {
          this.menuPosition.left = event.clientX + 'px';
          this.menuPosition.top = event.clientY + 'px';
          this.contextMenuShow = true;
        };
      }
    });
  },
};
</script>

<style scoped>

</style>
