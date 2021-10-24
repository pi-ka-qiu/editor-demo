export default class FontColor {
  private state: Record<string, unknown>;
  constructor(props: any) {
    this.state = {
      ...props,
    };
  }
  render() {
    const root = document.createElement('div');
    return root;
  }
}
