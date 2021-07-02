<template>
  <div class="editor-tree">
    <div style="position: relative">
      <tree
        class="tree"
        ref="tree"
        style="text-align: left"
        :data="treeData"
        @contextmenu="onContextMenu"
        @select="onTreeSelect"
      ></tree>
      <context-menu
        :position="menuPosition"
        @createFile="createFile"
        @createDir="createDir"
        @hidden="contextMenuShow = false"
        v-show="contextMenuShow"
      ></context-menu>
    </div>
    <editor-manager class="editor" ref="editor"></editor-manager>
  </div>
</template>

<script>
import ContextMenu from '@/component/context-menu.vue';
import Tree from './component/tree.vue';
import EditorManager from '@/component/editor-manager.vue';
import fs from './editor-tree-store';

fs.initFs('userName');
export default {
  name: 'editor-tree',
  components: {
    EditorManager,
    ContextMenu,
    Tree,
  },
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
      editorInstances: {
        key: [{}],
      },
    };
  },
  methods: {
    createFile(fileName) {
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
    },
    async loadTreeData() {
      // eslint-disable-next-line no-unused-vars
      const f = await fs.readdir(`/${this.rootName}`);
    },
    // tree 总的点击事件
    async onTreeSelect(selectedKeys, { selectedNodes }) {
      if (selectedKeys && selectedKeys.length === 1) {
        // 如果是文件
        if (selectedNodes[0].isLeaf) {
          this.selectFile(selectedKeys[0]);
          return;
        }
        this.selectDir(selectedKeys[0]);
      }
    },
    // 点击某一个文件
    async selectFile(filePath) {
      const content = await fs.readFile(filePath);
      let editor = this.$refs.editor.getEditor(filePath);
      if (!editor) {
        editor = this.$refs.editor.createEditor(filePath);
      }
      editor.$on('input', function (content) {
        fs.writeFile(filePath, content);
      });
      if (content) editor.setValue(content);
    },
    // 点击某一个文件夹
    async selectDir(filePath) {
      console.log(filePath);
    },
    saveEditorContent(content) {
      console.log(content);
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
    await fs.readdirWithType(
      `/${this.rootName}`,
      async ({ filePath, fileName, isFile }) => {
        if (isFile) {
          const content = await fs.readFile(filePath);
          console.log(content);
        }
        treeData.push({
          title: fileName,
          key: filePath,
          isLeaf: isFile,
        });
      },
    );
    this.treeData[0].children = treeData;
  },
};
</script>

<style scoped>
.editor-tree {
  display: flex;
  width: 100%;
}

.tree {
  width: 200px;
}

.editor {
  flex: 1 0 auto;
}
</style>
