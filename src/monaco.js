import * as monaco from 'monaco-editor';

const IStandaloneCodeEditor = monaco.editor.create(document.getElementById('monaco-render'), {
  lineNumbers: 'off', // 行号
  minimap: { // 小地图
    enabled: false,
  },
  value: [
    '```js',
    ' function x() {',
    '\tconsole.log("Hello world!");',
    '}',
    '```',
  ].join('\n'),
  language: 'markdown',
});

export default IStandaloneCodeEditor;
