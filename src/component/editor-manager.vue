<template>
  <div>
    <div class="editor-tab">
      <c-tab-group @tab-close="onTabClose">
        <c-tab v-for="item of tabGroup" :key="item.title" :name="item.title">
          {{ item.title || '未命名文件' }}
        </c-tab>
      </c-tab-group>
    </div>
    <div ref="editorManager"></div>
  </div>
</template>
<script>
import Editor from './editor.vue';
import Vue from 'vue';
import CTab from '@/component/tab';
import CTabGroup from '@/component/tab-group';

const EditorComponent = Vue.extend(Editor);
export default {
  name: 'editor-manager',
  components: {
    CTabGroup,
    CTab,
  },
  data() {
    return {
      editorMap: {},
      tabGroup: [],
    };
  },
  methods: {
    getEditor(filePath) {
      return this.editorMap[filePath];
    },
    createEditor(filePath) {
      if (!filePath) return;
      const key = filePath;
      if (this.editorMap[key]) return this.editorMap[key];

      const editor = new EditorComponent({
        propsData: {},
      }).$mount();
      this.$refs.editorManager.appendChild(editor.$el);
      this.editorMap[key] = editor;
      this.tabGroup.push({
        title: key,
      });
      return editor;
    },
    onTabClose({ name }) {
      const editor = this.editorMap[name];
      editor.$destroy();
      editor.$el.remove();
      this.editorMap[name] = undefined;
      const index = this.tabGroup.findIndex((value) => {
        return name === value.title;
      });
      this.tabGroup.splice(index, 1);
    },
  },
};
</script>

<style scoped></style>
