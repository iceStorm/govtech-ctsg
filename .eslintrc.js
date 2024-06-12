/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  root: true,
  ignorePatterns: ['**/*'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: ['./**/tsconfig.*?.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@nx', '@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:prettier/recommended',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': ['warn'],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        pathGroups: [
          { pattern: '@nestjs/**', group: 'external', position: 'before' },
          { pattern: '@/**', group: 'internal', position: 'before' },
          { pattern: '~/**', group: 'internal', position: 'after' },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
      },
    ],

    'class-methods-use-this': 'warn',
    'no-restricted-exports': ['error', { restrictDefaultExports: { defaultFrom: false } }],
    radix: 'warn',

    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: ['*'],
              },
            ],
          },
        ],
      },
    },
    // {
    //   files: ['*.ts', '*.tsx'],
    //   extends: ['plugin:@nx/typescript'],
    //   rules: {},
    // },
    {
      files: ['*.js', '*.jsx'],
      extends: ['plugin:@nx/javascript'],
      rules: {},
    },
    // {
    //   files: ['*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
    //   env: {
    //     jest: true,
    //   },
    //   rules: {},
    // },
  ],
};
