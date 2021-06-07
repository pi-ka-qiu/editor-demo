<template>
  <div>
    <div style="position: relative;">
      <tree ref="tree"
            style="text-align: left"
            :data="treeData"
            @contextmenu="onContextMenu"
      ></tree>
      <context-menu
        :position="menuPosition"
        @createFile="createFile"
        @createDir="createDir"
        @hidden="contextMenuShow = false"
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
      // 右键时在哪个文件、文件夹
      contextMenuPath: {},
      treeData: [
        {
          title: '0-0',
          key: '0-0',
          children: [],
        },
      ],
      rootName: 'tree',
    };
  },
  methods: {
    createFile(fileName) {
      console.log(fileName);
      fs.writeFile(`/${this.rootName}/${fileName}`, 'test content');
      this.contextMenuShow = false;
    },
    createDir() {
      fs.mkdir(this.rootName);
    },
    // 右键
    onContextMenu(event, data) {
      this.menuPosition.left = `${event.clientX}px`;
      this.menuPosition.top = `${event.clientY}px`;
      this.contextMenuPath = data;
      this.contextMenuShow = true;
      console.log(data, '');
    },
    async loadTreeData() {
      const f = await fs.readdir(`/${this.rootName}`);
      console.log(f);
    },
  },
  async mounted() {
    this.$nextTick(() => {
      if (this.$refs.tree.$el) {
        this.$refs.tree.$el.oncontextmenu = (event) => {
          this.menuPosition.left = `${event.clientX}px`;
          this.menuPosition.top = `${event.clientY}px`;
          this.contextMenuShow = true;
        };
      }
    });
    const treeData = [];
    await fs.readdirWithType(`/${this.rootName}`, async ({
      filePath, fileName, isDir, isFile,
    }) => {
      console.log(filePath, isDir, isFile);
      if (isFile) {
        const content = await fs.readFile(filePath);
        console.log(content);
      }
      treeData.push({
        title: fileName,
        key: filePath,
        isLeaf: isFile,
      });
    });
    this.treeData[0].children = treeData;
  },
};
</script>

<style scoped>

</style>
