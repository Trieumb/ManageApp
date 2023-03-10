module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  plugins: ['react', 'prettier'],
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    node: true,
  },
  globals: {
    localStorage: true,
    ga: true,
    fetch: true,
    window: true,
    document: true,
    Raven: true,
    ENV: true,
  },
  rules: {
    'import/no-unresolved': 'error',
    'react/prop-types': 'off',
    'no-console': 0,
    'react/sort-comp': [
      1,
      {
        order: [
          'type-annotations',
          'static-methods',
          'lifecycle',
          'everything-else',
          'render',
        ],
      },
    ],
  },
};
