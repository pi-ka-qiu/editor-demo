<template>
  <div>
    <div style="position: relative;width: 200px;">
      <tree ref="tree"
            @contextmenu="onContextMenu"
      ></tree>
      <context-menu
        :position="menuPosition"
        @createFile="createFile"
        v-show="contextMenuShow"></context-menu>
    </div>
    <editor></editor>
  </div>
</template>

<script>
import ContextMenu from '@/component/context-menu.vue';
import tree from './component/tree.vue';
import editor from './component/editor.vue';
import fs from './editor-tree-store';

fs.initFs('userName');
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
    createFile() {
      fs.writeFile('/test/path1.md', '');
    },
    // 右键
    onContextMenu(event, data) {
      this.menuPosition.left = `${event.clientX}px`;
      this.menuPosition.top = `${event.clientY}px`;
      this.contextMenuShow = true;
      console.log(data);
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.tree.$el) {
        this.$refs.tree.$el.oncontextmenu = (event) => {
          this.menuPosition.left = `${event.clientX}px`;
          this.menuPosition.top = `${event.clientY}px`;
          this.contextMenuShow = true;
        };
      }
    });
  },
};
</script>

<style scoped>

</style>
