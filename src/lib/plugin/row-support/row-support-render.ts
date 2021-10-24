import './row-support.scss';

// eslint-disable-next-line no-unused-vars
export default function rowSupportRender({ el }: { el: Element }) {
  return (editor: any) => {
    const root = document.createElement('div');
    root.className += `c-editor-row-number`;
    const lineHeight = editor.state.initParams.lineHeight;
    const fontSize = editor.state.initParams.fontSize;
    if (lineHeight) root.style.lineHeight = lineHeight;
    if (fontSize) root.style.fontSize = fontSize;
    el.classList.add('c-editor-row-number-wrap');
    el.appendChild(root);

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
          const count = Math.floor(root.clientHeight / lineHeight.slice(0, -2));
          renderRows(
            root,
            count > editor.contentEditable.children.length
              ? count
              : editor.contentEditable.children.length,
          );
        }
      }
    };

    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(callback);

    // 以上述配置开始观察目标节点
    observer.observe(targetNode, config);
    // 计算需要渲染的行数
    window.setTimeout(() => {
      console.log(root.clientHeight, 'cccccc2');
      const count = Math.floor(root.clientHeight / lineHeight.slice(0, -2));
      renderRows(
        root,
        count > editor.contentEditable.children.length
          ? count
          : editor.contentEditable.children.length,
      );
    }, 0);
    editor.onScroll(function (event: any) {
      console.log('scroll', event.target.scrollTop, root);
      // root.scrollTop = event.target.scrollTop;
      // root.style.transform = `translateY(-${event.target.scrollTop}px)`;
      root.style.top = `-${event.target.scrollTop}px`;
    });
    // @ts-ignore
    window.tt = root;
    root.addEventListener('wheel', function (event) {
      console.log('wheel222222222', event, editor.container.scrollTop);
      editor.container.scrollTop = editor.container.scrollTop + event.deltaY;
      return;
    });
    return editor;
  };
}

function createRow(keyNumber: number) {
  const row = document.createElement('div');
  row.innerText = keyNumber + '';
  row.setAttribute('row-key', keyNumber + '');
  return row;
}

function createRows(startKey: number, count: number) {
  const f = document.createDocumentFragment();
  for (let i = 1; i <= count; i++) {
    f.appendChild(createRow(startKey + i));
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
    // 删除所有子节点
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
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
