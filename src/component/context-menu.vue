<template>
   <div class="context-menu" :style="{
     left: position.left,
     top: position.top
   }">
     <div class="context-menu-item" @click="handClick('createFile')">新建文件</div>
     <div class="context-menu-item" @click="handClick('createDir')">新建文件夹</div>
     <div class="context-menu-item" @click="handClick('reName')">重命名</div>
     <div class="context-menu-item" @click="handClick('copy')">复制</div>
     <div class="context-menu-item" @click="handClick('paste')">粘贴</div>
     <div class="context-menu-item" @click="handClick('search')">搜索</div>
     <div class="context-menu-item" @click="handClick('git')">git</div>
   </div>
</template>

<script>


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
  data() {
    return {
    };
  },
  mounted() {
    // 阻止默认事件
    this.$el.oncontextmenu = (event) => {
      event.preventDefault();
    };
  },
  methods: {
    handClick(evName) {
      this.$emit(evName);
    },
  },
};
</script>

<style scoped>
.context-menu{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background: #eee;
  min-width: 200px;
}
.context-menu-item{
  text-align: left;
}
.context-menu-item:hover{
  background: #eaeaea;
}
.context-menu-item--activity{
  background: #eeeeee;
}
</style>
