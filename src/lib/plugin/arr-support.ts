export function rowSupport() {
  return (editor: any) => {
    console.log(editor);
    if (!editor.state.arrStructure) editor.state.arrStructure = {};

    // function setXMLValue(content) {}
    editor.setValue = (function (base) {
      return function (value: string) {
        console.log('继承');
        const content = (editor.state.arrStructure.value = value || '');
        base.call(editor, () => {
          const arr = content.split('\n');
          const f = document.createDocumentFragment();
          arr.forEach((item) => {
            const span = document.createElement('div');
            span.innerText = item;
            f.appendChild(span);
          });
          // 删除所有子节点
          while (editor.contentEditable.firstChild) {
            editor.contentEditable.removeChild(
              editor.contentEditable.firstChild,
            );
          }
          editor.contentEditable.appendChild(f);
        });
      };
    })(editor.setValue);
    editor.insertRow = function (
      value: string,
      append: boolean | number = true,
    ) {
      const div = document.createElement('div');
      div.innerText = value;
      if (typeof append === 'boolean' && append)
        editor.contentEditable.appendChild(div);
      else if (typeof append === 'number') {
        console.log(editor.contentEditable.children);
        if (editor.contentEditable.children[append - 1]) {
          editor.contentEditable.insertBefore(
            div,
            editor.contentEditable.children[append - 1],
          );
        } else {
          throw new Error('row number not exist');
        }
      }
    };
    editor.deleteRow = function (rowNumber: number) {
      if (editor.contentEditable.children[rowNumber - 1]) {
        editor.contentEditable.children[rowNumber - 1].remove();
      }
    };
  };
}
