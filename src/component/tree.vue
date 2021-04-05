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
        },
      ],
    },
  },
  methods: {
    onContextMenu(event, data) {
      event.preventDefault();
      event.stopPropagation();
      this.$emit('contextmenu', event, data);
    },
  },
  // eslint-disable-next-line no-unused-vars
  render(h) {
    const r = (data) => {
      const childEleVN = [];
      data.forEach((item) => {
        if (item.children) {
          const childEleVN2 = r(item.children);
          childEleVN.push(<Tree.TreeNode
            {...{ attrs: item }}
            vOn:contextmenu_native={(event) => {
              this.onContextMenu(event, item);
            }}>
            {childEleVN2}
          </Tree.TreeNode>);
        } else {
          childEleVN.push(<Tree.TreeNode
            {...{ attrs: item }}
            vOn:contextmenu_native={(event) => {
              this.onContextMenu(event, item);
            }}
          />);
        }
      });
      return childEleVN;
    };
    const childEle = r(this.data);
    return <Tree.DirectoryTree
      {...{ attrs: this.$attrs }}
    >{
      childEle
    }</Tree.DirectoryTree>;
  },
};
</script>

<style scoped>

</style>
