const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');


module.exports = {
  chainWebpack: (config) => {
    // 添加插件
    config.plugin('monaco').use(MonacoWebpackPlugin, [{
      languages: ['markdown'],
      features: ['coreCommands', 'find'],
    }]);
  },
};
