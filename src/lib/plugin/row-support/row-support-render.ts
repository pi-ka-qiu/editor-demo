import './row-support.scss';
export default function rowSupportRender() {
  return (editor: any) => {
    const root = document.createElement('div');
    root.className += `c-editor-row-number`;
    const cEditor = editor.root;
    cEditor.appendChild(root);
    cEditor.insertBefore(root, editor.container);

    console.log('watch', editor.contentEditable);
    // 选择需要观察变动的节点
    const targetNode = editor.contentEditable;

    // 观察器的配置（需要观察什么变动）
    const config = { characterData: true, childList: true };

    // 当观察到变动时执行的回调函数
    const callback = function (mutationsList: any) {
      // Use traditional 'for loops' for IE 11
      for (let mutation of mutationsList) {
        console.log(mutation);
        if (mutation.type === 'childList') {
          console.log('A child node has been added or removed.');
          renderRows(root, editor.contentEditable.children.length);
        }
      }
    };

    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(callback);

    // 以上述配置开始观察目标节点
    observer.observe(targetNode, config);
    renderRows(root, editor.contentEditable.children.length);

    return editor;
  };
}

function createRow(number: number) {
  const row = document.createElement('div');
  row.innerText = number + '';
  row.setAttribute('row-key', number + '');
  return row;
}
function createRows(start: number, count: number) {
  const f = document.createDocumentFragment();
  for (let i = 1; i <= count; i++) {
    f.appendChild(createRow(start + i));
  }
  return f;
}

function deleteRows(root: Element, count: number) {
  for (let i = 0; i < count; i++) {
    if (root.lastChild) root.removeChild(root.lastChild);
  }
}

function renderRows(root: Element, total: number) {
  if (
    !root.lastElementChild ||
    !root.lastElementChild.getAttribute('row-key')
  ) {
    const f = createRows(0, total);
    root.appendChild(f);
    return;
  }
  const key = root.lastElementChild.getAttribute('row-key');
  if (!key) throw new Error('row key error');
  const count = total - parseInt(key);
  console.log(count, 'cccc', total);
  if (count > 0) {
    const f = createRows(parseInt(key), count);
    root.appendChild(f);
  } else if (count < 0) {
    deleteRows(root, Math.abs(count));
  }
}
