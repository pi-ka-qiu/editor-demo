module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': ['error', { code: 200 }],
    'max-lines-per-function': ['error', { max: 100 }],
    'max-depth': ['error', 4],
    'template-curly-spacing': 'off',
    indent: 'off',
  },
};
