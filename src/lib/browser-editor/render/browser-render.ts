const PREFIX = 'c-editor';

class PlaceholderRender {
  placeholderEle: HTMLElement | undefined;

  render({ placeholder = '' }) {
    const placeholderEle = document.createElement('div');
    placeholderEle.className += `${PREFIX}-placeholder`;
    placeholderEle.innerText = placeholder;
    this.placeholderEle = placeholderEle;
    return placeholderEle;
  }

  changeVisible(visible: Boolean) {
    if (visible === undefined || !this.placeholderEle) return;
    if (visible && this.placeholderEle.style.visibility !== 'visible') {
      this.placeholderEle.style.visibility = 'visible';
    } else if (this.placeholderEle.style.visibility !== 'hidden') {
      this.placeholderEle.style.visibility = 'hidden';
    }
  }
}

export default function render(params = { placeholder: '', content: '' }) {
  const container = document.createElement('div');
  container.className += `${PREFIX}-wrapper`;
  const contentEditable = document.createElement('div');
  contentEditable.className += `${PREFIX}-editable`;
  contentEditable.setAttribute('contenteditable', 'true');
  contentEditable.setAttribute('spellcheck', 'false');

  let placeholderRender: PlaceholderRender | null = null;
  if (params.placeholder) {
    placeholderRender = new PlaceholderRender();
    const placeholderEle = placeholderRender.render({
      placeholder: params.placeholder,
    });
    if (params.content) {
      placeholderRender.changeVisible(false);
    }
    contentEditable.addEventListener('input', () => {
      if (!placeholderRender) return;
      if (contentEditable.innerText) {
        placeholderRender.changeVisible(false);
      } else {
        placeholderRender.changeVisible(true);
      }
    });
    contentEditable.addEventListener('paste', function (e) {
      e.stopPropagation();
      e.preventDefault();
      let text = '';
      let event = e;
      if (event.clipboardData && event.clipboardData.getData) {
        text = event.clipboardData.getData('text/plain');
      } else {
        // @ts-ignore
        if (window.clipboardData && window.clipboardData.getData) {
          // @ts-ignore
          text = window.clipboardData.getData('Text');
        }
      }
      if (document.queryCommandSupported('insertText')) {
        document.execCommand('insertText', false, text);
      } else {
        document.execCommand('paste', false, text);
      }
    });
    container.appendChild(placeholderEle);
  }

  function getValue() {
    let str = '';
    for (let i = 0; i < contentEditable.childNodes.length; i++) {
      const item = contentEditable.childNodes[i];
      const type = item.nodeType;
      console.log(str);
      if (type === Node.ELEMENT_NODE) {
        const nextItem = contentEditable.childNodes[i + 1];
        if (item.nodeName === 'BR' && !nextItem) continue;
        if (item.nodeName === 'BR' && nextItem) {
          str += '\n';
        } else if (item.nodeName !== 'BR') {
          if (str.endsWith('\n')) {
            str += nextItem ? item.textContent + '\n' : item.textContent;
          } else {
            str +=
              i === 0
                ? item.textContent + '\n'
                : '\n' + item.textContent + '\n';
          }
        }
      } else {
        str += item.textContent;
      }
    }
    return str;
  }

  function setValue(value: string | Function) {
    if (typeof value === 'string') {
      contentEditable.innerText = value || '';
    } else if (typeof value === 'function') {
      value();
    }
    if (!placeholderRender) return;
    if (contentEditable.innerText && contentEditable.innerText.length) {
      placeholderRender.changeVisible(false);
    } else {
      placeholderRender.changeVisible(true);
    }
  }

  container.appendChild(contentEditable);
  return {
    container,
    contentEditable,
    setValue,
    getValue,
  };
}
