module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@vue/babel-preset-jsx',
      {
        injectH: true,
        vOn: true,
        vModel: true,
      },
    ],
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: false,
      },
    ],
  ],
};
