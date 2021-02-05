/**
 * 基础编辑器，提供自适应高度，定位为Textarea 的代替品
 */
// @ts-ignore
import EditorCord from './editor-core.ts';

function render(params = { placeholder: '' }) {
  const PREFIX = 'c-editor';
  const container = document.createElement('div');
  container.className += `${PREFIX}-wrapper`;
  const contentEditable = document.createElement('div');
  contentEditable.className += `${PREFIX}-editable`;
  contentEditable.setAttribute('contenteditable', 'true');

  if (params.placeholder) {
    const placeholderEle = document.createElement('div');
    placeholderEle.className += `${PREFIX}-placeholder`;
    placeholderEle.innerText = params.placeholder;
    container.appendChild(placeholderEle);
  }

  container.appendChild(contentEditable);

  return {
    container,
    contentEditable,
  };
}
export default class BrowserEditor implements EditorCord {
  container: Element;

  contentEditable: Element;

  constructor(el: Element, params = { placeholder: '' }) {
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
    return this.contentEditable.textContent;
  }

  render(params:any) {
    return render(params);
  }

  use(plugin: any) {
    return plugin.install(this);
  }
}
