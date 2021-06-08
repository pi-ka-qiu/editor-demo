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

  let placeholderRender: PlaceholderRender | null = null;
  if (params.placeholder) {
    placeholderRender = new PlaceholderRender();
    const placeholderEle = placeholderRender.render({ placeholder: params.placeholder });
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
    container.appendChild(placeholderEle);
  }

  container.appendChild(contentEditable);

  return {
    container,
    contentEditable,
  };
}
