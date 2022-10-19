module.exports = {
  extends: [
    'react-app',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  plugins: ['simple-import-sort'],
  rules: {
    'space-before-function-paren': 0,
    'react/prop-types': 0,
    'react/jsx-handler-names': 0,
    'react/jsx-fragments': 0,
    'react/no-unused-prop-types': 0,
    'import/export': 0,
    'simple-import-sort/imports': 'error',
    'import/no-default-export': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'require-await': 'error'
  },
  overrides: [
    {
      files: ['*.stories.tsx'],
      rules: {
        'import/no-default-export': 0
      }
    },
    {
      files: ['*.*'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages. `react` related packages come first.
              ['^react', '^@?\\w'],
              // Packages.
              // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
              ['^@?\\w'],
              // Absolute imports and other imports such as Vue-style `@/foo`.
              // Anything that does not start with a dot.
              ['^[^.]'],
              // Side effect imports.
              ['^\\u0000'],
              // Relative imports.
              // Anything that starts with a dot.
              ['^\\.'],
              // Style imports.
              ['^.+\\.s?css$']
            ]
          }
        ]
      }
    },
    {
      files: ['*.d.ts'],
      rules: {
        'import/no-default-export': 0,
        'prettier/prettier': 0
      }
    }
  ]
};
