module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0, //
    'arrow-parens': 0, // Prettier messes this one up
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'function-paren-newline': 0,
    'react/prop-types': 0, // We are using flow instead
    'react/jsx-filename-extension': 0, // Prefer .js
    'react/prefer-stateless-function': 1, // Just warn
    'jsx-a11y/accessible-emoji': 0, // Because I was lazy
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        // So the "to" prop in Link and NavLink are considered ok
        specialLink: ['to'],
      },
    ],
  },
  // Add enzymes shallow, render, mount, Raven to be valid global vars
  globals: {
    shallow: true,
    render: true,
    mount: true,
  },
};
