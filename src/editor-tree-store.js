import { FileSystem } from 'file-api';

let fs = null;
// fs 用于持久化数据，最新变量从state里面获取
export default {
  state: {
    namespace: '',
    fileList: [],
    editorContent: {},
  },
  initFs(namespace) {
    this.state.namespace = namespace;
    fs = new FileSystem({ treePrefix: `trees-${namespace}`, pathPrefix: `path-${namespace}` });
  },
  // 初始化文件列表、会清除之前的缓存
  initFileList: async (fileList) => {
    this.state.fileList = fileList;
    await fs.rmdir();
    // 文件内容、文件夹 缓存
    const p = fileList.map(file => fs.writeFile(file.path, file.content));
    await Promise.all(p);
  },
  // 设置编辑器内容
  async writeFile(path, content) {
    this.state.editorContent[path] = content;
    await fs.writeFile(path, content);
  },
  async appendFile(path, data) {
    this.state.editorContent[path] = this.state.editorContent[path] + data;
    await fs.appendFile(path, data);
  },
  async readFile(path, options) {
    return fs.readFile(path, options);
  },
  async rename(oldPath, newPath) {
    if (this.state.fileList[newPath]) {
      throw new Error('文件名重复');
    }
    await fs.rename(oldPath, newPath);
    this.state.fileList[newPath] = this.state.fileList[oldPath];
  },
  async mkdir(path, options) {
    return fs.mkdir(path, options);
  },
  async rmdir(path) {
    return fs.rmdir(path);
  },
  async readdir(path) {
    return fs.readdir(path);
  },
};
