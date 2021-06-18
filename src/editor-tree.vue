<template>
  <div>
    <div style="position: relative">
      <tree
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
    <editor-manager ref='editor'></editor-manager>
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
    // tree 总的点击事件
    async onTreeSelect(selectedKeys, { selectedNodes, ...e }) {
      console.log(selectedKeys, e);
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
      console.log(filePath);
      const content = await fs.readFile(filePath);
      console.log(content);
      let editor = this.$refs.editor.getEditor(filePath);
      console.log('editor 0', editor);
      if (!editor) {
        editor = this.$refs.editor.createEditor(filePath);
      }
      this.$nextTick(() => {
        console.log('editor', editor);
      });
      editor.$on('input', function(content) {
        console.log(content);
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
      async ({ filePath, fileName, isDir, isFile }) => {
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
      },
    );
    this.treeData[0].children = treeData;
  },
};
</script>

<style scoped></style>
