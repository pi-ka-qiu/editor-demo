<template>
  <div id="app">
    <editor-tree></editor-tree>
  </div>
</template>

<script>
import editorTree from '../src/editor-tree.vue';

export default {
  name: 'app',
  components: {
    editorTree,
  },
  created() {
    let a =
      "const PREFIX = 'c-editor';\n" +
      '\n' +
      'class PlaceholderRender {\n' +
      '  placeholderEle: HTMLElement | undefined;\n' +
      '\n' +
      "  render({ placeholder = '' }) {\n" +
      "    const placeholderEle = document.createElement('div');\n" +
      '    placeholderEle.className += `${PREFIX}-placeholder`;\n' +
      '    placeholderEle.innerText = placeholder;\n' +
      '    this.placeholderEle = placeholderEle;\n' +
      '    return placeholderEle;\n' +
      '  }\n' +
      '\n' +
      '  changeVisible(visible: Boolean) {\n' +
      '    if (visible === undefined || !this.placeholderEle) return;\n' +
      "    if (visible && this.placeholderEle.style.visibility !== 'visible') {\n" +
      "      this.placeholderEle.style.visibility = 'visible';\n" +
      "    } else if (this.placeholderEle.style.visibility !== 'hidden') {\n" +
      "      this.placeholderEle.style.visibility = 'hidden';\n" +
      '    }\n' +
      '  }\n' +
      '}\n' +
      '\n' +
      "export default function render(params = { placeholder: '', content: '' }) {\n" +
      "  const container = document.createElement('div');\n" +
      '  container.className += `${PREFIX}-wrapper`;\n' +
      "  const contentEditable = document.createElement('div');\n" +
      '  contentEditable.className += `${PREFIX}-editable`;\n' +
      "  contentEditable.setAttribute('contenteditable', 'true');\n" +
      "  contentEditable.setAttribute('spellcheck', 'false');\n" +
      '\n' +
      '  let placeholderRender: PlaceholderRender | null = null;\n' +
      '  if (params.placeholder) {\n' +
      '    placeholderRender = new PlaceholderRender();\n' +
      '    const placeholderEle = placeholderRender.render({\n' +
      '      placeholder: params.placeholder,\n' +
      '    });\n' +
      '    if (params.content) {\n' +
      '      placeholderRender.changeVisible(false);\n' +
      '    }\n' +
      "    contentEditable.addEventListener('input', () => {\n" +
      '      if (!placeholderRender) return;\n' +
      '      if (contentEditable.innerText) {\n' +
      '        placeholderRender.changeVisible(false);\n' +
      '      } else {\n' +
      '        placeholderRender.changeVisible(true);\n' +
      '      }\n' +
      '    });\n' +
      '    container.appendChild(placeholderEle);\n' +
      '  }\n' +
      "  contentEditable.addEventListener('paste', function (e) {\n" +
      '    e.stopPropagation();\n' +
      '    e.preventDefault();\n' +
      "    let text = '';\n" +
      '    let event = e;\n' +
      '    if (event.clipboardData && event.clipboardData.getData) {\n' +
      "      text = event.clipboardData.getData('text/plain');\n" +
      '    } else {\n' +
      '      // @ts-ignore\n' +
      '      if (window.clipboardData && window.clipboardData.getData) {\n' +
      '        // @ts-ignore\n' +
      "        text = window.clipboardData.getData('Text');\n" +
      '      }\n' +
      '    }\n' +
      '    setValue(text);\n' +
      '  });\n' +
      '\n' +
      '  function getValue() {\n' +
      "    let str = '';\n" +
      '    for (let i = 0; i < contentEditable.childNodes.length; i++) {\n' +
      '      const item = contentEditable.childNodes[i];\n' +
      '      const type = item.nodeType;\n' +
      '      console.log(str);\n' +
      '      if (type === Node.ELEMENT_NODE) {\n' +
      '        const nextItem = contentEditable.childNodes[i + 1];\n' +
      "        if (item.nodeName === 'BR' && !nextItem) continue;\n" +
      "        if (item.nodeName === 'BR' && nextItem) {\n" +
      "          str += '\\n';\n" +
      "        } else if (item.nodeName !== 'BR') {\n" +
      "          if (str.endsWith('\\n')) {\n" +
      "            str += nextItem ? item.textContent + '\\n' : item.textContent;\n" +
      '          } else {\n' +
      '            str +=\n' +
      '              i === 0\n' +
      "                ? item.textContent + '\\n'\n" +
      "                : '\\n' + item.textContent + '\\n';\n" +
      '          }\n' +
      '        }\n' +
      '      } else {\n' +
      '        str += item.textContent;\n' +
      '      }\n' +
      '    }\n' +
      '    return str;\n' +
      '  }\n' +
      '\n' +
      '  function setValue(value: string | Function) {\n' +
      "    if (typeof value === 'string') {\n" +
      "      const content = value || '';\n" +
      "      const arr = content.split('\\n');\n" +
      '      const f = document.createDocumentFragment();\n' +
      '      arr.forEach((item, index) => {\n' +
      "        const span = document.createElement('div');\n" +
      '        if ((!item || !item.length) && index !== arr.length - 1) {\n' +
      "          span.innerText = '';\n" +
      '        } else {\n' +
      '          span.innerText = item;\n' +
      '        }\n' +
      '        f.appendChild(span);\n' +
      '      });\n' +
      '      // 删除所有子节点\n' +
      '      while (contentEditable.firstChild) {\n' +
      '        contentEditable.removeChild(contentEditable.firstChild);\n' +
      '      }\n' +
      '      contentEditable.appendChild(f);\n' +
      "    } else if (typeof value === 'function') {\n" +
      '      value();\n' +
      '    }\n' +
      '    if (!placeholderRender) return;\n' +
      '    if (contentEditable.innerText && contentEditable.innerText.length) {\n' +
      '      placeholderRender.changeVisible(false);\n' +
      '    } else {\n' +
      '      placeholderRender.changeVisible(true);\n' +
      '    }\n' +
      '  }\n' +
      '\n' +
      '  container.appendChild(contentEditable);\n' +
      '  return {\n' +
      '    container,\n' +
      '    contentEditable,\n' +
      '    setValue,\n' +
      '    getValue,\n' +
      '  };\n' +
      '}\n';
    console.log(a);
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
