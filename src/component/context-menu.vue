<template>
   <div class="context-menu">
     <div @click="create">新建</div>
   </div>
</template>

<script>
function create(event) {
  console.log(event);
}
function t() {
  document.oncontextmenu = function (ev) {
    console.log(ev);
  };
}
export default {
  name: 'context-menu',
  mounted() {
    t();
  },
  methods: {
    create,
  },
};
</script>

<style scoped>

</style>
