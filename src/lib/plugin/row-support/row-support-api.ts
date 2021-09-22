export default function rowSupport() {
  return (editor: any) => {
    console.log(editor);
    if (!editor.state.arrStructure) editor.state.arrStructure = {};

    /**
     * 在某一行之后插入内容
     * @param value 内容
     * @param append 布尔值表示追加到最后，数字则表示行数
     */
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
    /**
     * 删除某一行内容
     * @param rowNumber
     */
    editor.deleteRow = function (rowNumber: number) {
      if (editor.contentEditable.children[rowNumber - 1]) {
        editor.contentEditable.children[rowNumber - 1].remove();
      }
    };
    return editor;
  };
}
