module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: "standard",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["vue"],
  rules: {
    "no-console": "off",
    "max-len": ["error", { code: 300 }],
    quotes: [2, "double"],
    "linebreak-style": [0, "error", "windows"]
  }
};
