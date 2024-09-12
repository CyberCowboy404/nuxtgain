import antfu from '@antfu/eslint-config'

export default antfu({
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    '@nuxt/eslint-config',
  ],
  rules: {
    'curly': 'off',
    'vue/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'semi': ['error', 'never'],
    'ts/no-explicit-any': 'error',
    'no-unexpected-multiline': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'style/comma-dangle': 'off',
    'unused-imports/no-unused-vars': 'off',
    'node/prefer-global/process': 'off',
    'import/order': ['error', {
      'pathGroups': [
        {
          pattern: 'node:*',
          group: 'builtin',
          position: 'before',
        },
        {
          pattern: '@/**',
          group: 'external',
        },
      ],
      'pathGroupsExcludedImportTypes': ['builtin'],
      'newlines-between': 'always',
    }],
  },
})
