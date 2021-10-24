import './tool-bar.scss';
import {
  b,
  fontColor,
  fontSize,
  heading,
  italic,
  strikethrough,
  underline,
} from './icon';

interface barParams {
  el: Element;
  onClick: (name: string, e: Event) => void;
}
export default function barRender({ el, onClick }: barParams) {
  // eslint-disable-next-line no-unused-vars
  return (editor: any) => {
    const root = document.createElement('div');
    root.className += `c-editor-tool-bar`;
    const iconList = [
      { el: b, key: 'B', title: '加粗' },
      { el: fontColor, key: 'FONT_COLOR', title: '字体颜色' },
      { el: fontSize, key: 'FONT_SIZE', title: '字体大小' },
      { el: heading, key: 'HEADING', title: '标题大小' },
      { el: italic, key: 'ITALIC', title: '斜体' },
      { el: strikethrough, key: 'STRIKETHROUGH', title: '删除线' },
      { el: underline, key: 'UNDERLINE', title: '下划线' },
    ];
    const icons = iconList.map((item) => {
      item.el.setAttribute('title', item.title);
      return item.el;
    });
    root.append(...icons);
    // 对icon添加监听
    iconList.map((icon) => {
      icon.el.addEventListener('click', (e) => {
        onClick(icon.key, e);
      });
    });
    el.appendChild(root);
  };
}
