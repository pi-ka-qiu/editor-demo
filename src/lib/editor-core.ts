interface EditorCore {
  onFocus(func: () => any): void;
  onBlur(func: () => any): void;
  onInput(func: () => any): void;
  getValue(): any;

}
