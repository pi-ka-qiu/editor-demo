/**
 * 基础编辑器，提供自适应高度，定位为Textarea 的代替品
 */
import { EditorCore } from '../editor-core';
import browserRender from './render/browser-render';

export default class BrowserEditor implements EditorCore {
  container: HTMLElement;
  contentEditable: HTMLElement;
  root: Element;
  state: Object;
  getValue: () => {};

  // eslint-disable-next-line no-unused-vars
  setValue: (value: string) => void;

  constructor(
    el: Element,
    {
      placeholder = '',
      content = '',
      fontSize = '14px',
      lineHeight = '20px',
      ...params
    },
  ) {
    const initParams = {
      placeholder,
      content,
      fontSize,
      lineHeight,
      ...params,
    };
    // 初始化element 节点
    const { container, contentEditable, getValue, setValue } =
      this.render(initParams);
    el.appendChild(container);
    el.classList.add('c-editor');
    this.state = {
      initParams: initParams,
    };
    this.container = container;
    this.contentEditable = contentEditable;
    this.root = el;
    this.getValue = getValue;
    this.setValue = setValue;
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

  onScroll(func: (event: any) => void) {
    this.container.addEventListener('scroll', func);
  }

  // eslint-disable-next-line class-methods-use-this
  render(params: any) {
    return browserRender(params);
  }

  use(plugin: any) {
    return plugin(this);
  }
}
