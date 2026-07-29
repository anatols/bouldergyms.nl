import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import configPrettier from "eslint-config-prettier/flat";

export default [
  {
    ignores: ["dist/**"],
  },
  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  // Must stay last: turns off rules that would fight Prettier.
  configPrettier,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        localStorage: "readonly",
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
];
