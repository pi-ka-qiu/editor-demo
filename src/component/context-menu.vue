<template>
  <div
    class="context-menu"
    :style="{
      left: position.left,
      top: position.top,
    }"
  >
    <a-popover trigger="click" title="新建文件">
      <template slot="content">
        <a-input
          placeholder="文件名"
          @pressEnter="handClick('createFile', $event.target.value)"
        ></a-input>
      </template>
      <div class="context-menu-item">新建文件</div>
    </a-popover>
    <div class="context-menu-item" @click="handClick('createDir')">
      新建文件夹
    </div>
    <div class="context-menu-item" @click="handClick('reName')">重命名</div>
    <div class="context-menu-item" @click="handClick('copy')">复制</div>
    <div class="context-menu-item" @click="handClick('paste')">粘贴</div>
    <div class="context-menu-item" @click="handClick('search')">搜索</div>
    <div class="context-menu-item" @click="handClick('git')">git</div>
  </div>
</template>

<script>
import { Popover, Input } from 'ant-design-vue';
import 'ant-design-vue/lib/popover/style/index.css';
import 'ant-design-vue/lib/input/style/index.css';

export default {
  name: 'context-menu',
  props: {
    position: {
      type: Object,
      default() {
        return {
          left: '0px',
          top: '0px',
        };
      },
    },
  },
  components: {
    APopover: Popover,
    AInput: Input,
  },
  data() {
    return {};
  },
  mounted() {
    // 阻止默认事件
    this.$el.oncontextmenu = (event) => {
      event.preventDefault();
    };
  },
  methods: {
    handClick(evName, ev) {
      if (ev) this.$emit(evName, ev);
      else {
        this.$emit('hidden');
      }
    },
  },
};
</script>

<style scoped>
.context-menu {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background: #eee;
  min-width: 200px;
}

.context-menu-item {
  text-align: left;
}

.context-menu-item:hover {
  background: #eaeaea;
}

.context-menu-item--activity {
  background: #eeeeee;
}
</style>
