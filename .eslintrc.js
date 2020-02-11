module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "vue/script-indent": ['error', 4, { 'baseIndent' : 1}, 'tab']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
