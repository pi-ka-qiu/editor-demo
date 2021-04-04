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
  render(h) {
    const r = (data) => {
      const childEleVN = [];
      data.forEach((item) => {
        if (item.children) {
          const childEleVN2 = r(item.children);
          childEleVN.push(<Tree.TreeNode {... { attrs: item }} >
            {childEleVN2}
          </Tree.TreeNode>);
        } else {
          childEleVN.push(<Tree.TreeNode {...{ attrs: item }} ></Tree.TreeNode>);
        }
      });
      return childEleVN;
    };
    const childEle = r(this.data);
    return <Tree.DirectoryTree {...{ attrs: this.$attrs }}
    >{
      childEle
    }</Tree.DirectoryTree>;
  },
};
</script>

<style scoped>

</style>
