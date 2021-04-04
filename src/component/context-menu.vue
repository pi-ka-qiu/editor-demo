<template>
   <div class="context-menu" :style="{
     left: position.left,
     top: position.top
   }">
     <div @click="create">新建</div>
   </div>
</template>

<script>
function create(event) {
  console.log(event);
}

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
  },
  methods: {
    create,
  },
};
</script>

<style scoped>
.context-menu{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
}
</style>
