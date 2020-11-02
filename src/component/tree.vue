<script>
import { Tree } from 'ant-design-vue';

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
  render(createElement) {
    const r = function (data) {
      if (data.children) {
        const childEle = r(data.children);
        return createElement(Tree.TreeNode, data, childEle);
      }
      console.log(data);
      return createElement(Tree.TreeNode, data);
    };
    console.log(this.data);
    const childEle = r(this.data);
    console.log('childEle', childEle);
    const t = createElement(Tree.DirectoryTree, this.data, childEle);
    console.log('all', t);
    return t;
  },
};
</script>

<style scoped>

</style>
