<template>
  <a-directory-tree multiple default-expand-all @select="onSelect" @expand="onExpand">
    <a-tree-node
      v-for="(item,index) of data"
      :key="index"
      :title="item.label"
    >

    </a-tree-node>
  </a-directory-tree>
</template>

<script>
export default {
  name: 'tree',
  props: {
    data: {
      type: Array,
      default: () => [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1',
          }],
        }],
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1',
          }],
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1',
          }],
        }],
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1',
          }],
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1',
          }],
        }],
      }],
    },
  },
  methods: {
    onSelect(keys, event) {
      console.log('Trigger Select', keys, event);
    },
    onExpand() {
      console.log('Trigger Expand');
    },
  },
};
</script>

<style scoped>

</style>
