module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    commonjs: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: [
    '@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {

  }
}
