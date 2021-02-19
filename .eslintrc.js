module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    // 'react-app',
    // 'react-app/jest',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/comma-dangle': 'warn',
    'comma-dangle': 'warn',
    'import/prefer-default-export': 'warn',
    'react/prop-types': 'off',
    'no-console': 'off',
  },
};
