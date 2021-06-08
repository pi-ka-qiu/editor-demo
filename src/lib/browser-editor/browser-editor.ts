/**
 * 基础编辑器，提供自适应高度，定位为Textarea 的代替品
 */
// @ts-ignore
import EditorCord from '../editor-core';
import browserRender from './render/browser-render';

export default class BrowserEditor implements EditorCord {
  container: HTMLElement;

  contentEditable: HTMLElement;

  constructor(el: Element, params = { placeholder: '', content: '' }) {
    // 初始化element 节点
    const { container, contentEditable } = this.render(params);
    el.appendChild(container);

    this.container = container;
    this.contentEditable = contentEditable;
  }

  onFocus(func: () => any) {
    this.contentEditable.addEventListener('focus', func);
  }

  onBlur(func: () => any) {
    this.contentEditable.addEventListener('blur', func);
  }

  onInput(func: () => any) {
    this.contentEditable.addEventListener('input', func);
  }

  getValue() {
    return this.contentEditable.innerText;
  }

  // eslint-disable-next-line class-methods-use-this
  render(params:any) {
    return browserRender(params);
  }

  use(plugin: any) {
    return plugin.install(this);
  }
}
