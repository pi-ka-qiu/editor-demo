<script>
import { Tree } from 'ant-design-vue';

export default {
  name: 'tree',
  props: {
    data: {
      type: Array,
      default: () => [
        {
          title: '0-0',
          key: '0-0',
          children: [
            {
              title: '0-0-0',
              key: '0-0-0',
              children: [
                { title: '0-0-0-0', key: '0-0-0-0' },
                { title: '0-0-0-1', key: '0-0-0-1' },
                { title: '0-0-0-2', key: '0-0-0-2' },
              ],
            },
            {
              title: '0-0-1',
              key: '0-0-1',
              children: [
                { title: '0-0-1-0', key: '0-0-1-0' },
                { title: '0-0-1-1', key: '0-0-1-1' },
                { title: '0-0-1-2', key: '0-0-1-2' },
              ],
            },
            {
              title: '0-0-2',
              key: '0-0-2',
            },
          ],
        },
        {
          title: '0-1',
          key: '0-1',
          children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' },
          ],
        },
        {
          title: '0-2',
          key: '0-2',
        },
      ],
    },
  },
  methods: {
  },
  render(createElement) {
    const r = (data) => {
      const childEleVN = [];
      data.forEach((item) => {
        if (item.children) {
          const childEleVN2 = r(item.children);
          childEleVN.push(createElement(Tree.TreeNode, {
            props: item,
          }, childEleVN2));
        } else {
          childEleVN.push(createElement(Tree.TreeNode, {
            props: item,
          }));
        }
      });
      return childEleVN;
    };
    const childEle = r(this.data);
    return createElement(Tree.DirectoryTree, {
      attrs: this.$attrs,
    }, childEle);
  },
};
</script>

<style scoped>

</style>
