module.exports = {
  root: true,
  env: {
    node: true,
  },
  // https://github.com/infctr/eslint-plugin-typescript-sort-keys
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    // https://github.com/aladdin-add/eslint-plugin/tree/master/packages/autofix#eslint-plugin-autofix
    'autofix',
    // https://github.com/sweepline/eslint-plugin-unused-imports
    'unused-imports',
    // https://github.com/infctr/eslint-plugin-typescript-sort-keys
    'typescript-sort-keys',
    // https://github.com/import-js/eslint-import-resolver-typescript
    'import',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // https://github.com/prettier/eslint-config-prettier#installation
    'prettier',
  ],
  rules: {
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md
    'import/no-duplicates': 'error',
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    'import/order': [
      'error',
      {
        groups: [
          'index',
          'sibling',
          'parent',
          'internal',
          'external',
          'builtin',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'typescript-sort-keys/interface': 'error',
  },
}
