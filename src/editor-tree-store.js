import { FileSystem } from 'file-api';

const fs = new FileSystem({ treePrefix: 'trees', pathPrefix: 'path' });
// fs 用于持久化数据，最新变量从state里面获取
export default {
  state: {
    fileList: [],
    editorContent: {},
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
  writeFile(path, content) {
    this.state.editorContent[path] = content;
    fs.writeFile(path, content);
  },
};
