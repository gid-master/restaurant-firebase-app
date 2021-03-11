module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier/recommended",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/interface-name-prefix": "off"
    // "max-len": ["warn", {
    //   "code": 100,
    //   "ignoreComments": false,
    //   "ignoreRegExpLiterals": true,
    //   "ignoreStrings": false,
    //   "ignoreTemplateLiterals": false
    // }],
    // "prettier/prettier": [
    //   "warn",
    //   {
    //     "printWidth": 100,
    //     "singleQuote": false,
    //   }
    // ]
  }
};
