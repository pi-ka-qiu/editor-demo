// eslint-disable-next-line import/no-extraneous-dependencies
import { FileSystem } from 'browser-file-api';

let fs = null;
// fs 用于持久化数据，最新变量从state里面获取
export default {
  state: {
    namespace: '',
    fileList: [],
    editorContent: {},
  },
  initFs(namespace) {
    this.state.namespace = namespace || '';
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
    this.state.editorContent[path] += data;
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
  // 读取文件夹下文件，并判断是否文件夹
  async readdirWithType(path, cb) {
    const files = await fs.readdir(path);
    return files.map(async (fileName) => {
      const endS = path.endsWith('/');
      const endPath = endS ? path : `${path}/`;
      const filePath = endPath + fileName;
      const stat = await fs.statSync(filePath);
      const isDir = stat.isDirectory();
      const isFile = stat.isFile();
      return cb({
        filePath, fileName, isDir, isFile,
      });
    });
  },
};
