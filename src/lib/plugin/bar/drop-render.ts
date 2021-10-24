interface DropRenderProps {
  showDownIcon: boolean;
}

export default class DropRender {
  private state: Record<string, unknown>;
  private props: DropRenderProps;
  constructor(props: DropRenderProps) {
    this.props = props;
    this.state = {
      isShow: false, // 是否显示下拉
      isMousedown: false, // 鼠标是否点击
      isMouseup: false, // 鼠标是否在松开
    };
  }

  onMousedown() {}
  onMouseup() {}

  changeShow() {}

  render() {
    const root = document.createElement('div');
    root.className += 'c-editor-drop-select';
    return root;
  }
}
