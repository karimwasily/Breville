module.exports =  {
  parser:  'babel-eslint',  // Specifies the ESLint parser
  extends:  [
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:react/recommended',
  ],
  parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
  },
  settings: {
      react: {
          version: 'detect',
      },
  },
  plugins: ['react', 'header'],
  rules:  {
      "curly": 0,
      "@typescript-eslint/explicit-function-return-type": [0],
      "@typescript-eslint/no-explicit-any": [0],
      "ordered-imports": [0],
      "object-literal-sort-keys": [0],
      "max-len": [1, 120],
      "new-parens": 0,
      "no-bitwise": 1,
      "no-cond-assign": 1,
      "no-trailing-spaces": 0,
      "eol-last": 1,
      "func-style": ["error", "declaration", { "allowArrowFunctions": true }],
      "semi": 0,
      "no-var": 0
  },
};
