const fabric = require("@umijs/fabric");

module.exports = {
  ...fabric.eslint,
  rules: {
    ...fabric.default.rules,
    "react/destructuring-assignment": 1,
    "prefer-destructuring": 1,
    "react/sort-comp": 1,
    "require-yield": 1,
    "no-cond-assign": 1,
    "react/prefer-stateless-function": 1,
    "import/no-extraneous-dependencies": 1,
    "consistent-return": 1,
    "react/no-access-state-in-setstate": 1,
    "no-restricted-globals": 1,
    "import/prefer-default-export": 0,
    "react/jsx-closing-tag-location": 1,
    "no-nested-ternary": 1,
    "react-hooks/rules-of-hooks": 2,
    "@typescript-eslint/array-type": 0,
    "@typescript-eslint/prefer-interface": 0,
  },
};
