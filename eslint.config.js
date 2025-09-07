import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintReact from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.{ts,tsx}"],
  ignores: [
    "dist",
    "node_modules",
    "eslint.config.js",
    "coverage",
    "__tests__",
    "**/*.test.*",
    "*.js",
    "*.jsx",
    ".vscode",
    ".idea",
    ".gitignore",
    ".prettierrc",
    ".prettierignore",
    "package.json",
    "package-lock.json",
    "tsconfig.app.json",
    "tsconfig.node.json",
    ".husky",
    "tsconfig.json",
    "vite.config.ts",
    "README.md",
  ],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    'typescript-eslint': tseslint.plugin,
    react: eslintReact,
    prettier: prettierPlugin,
    "simple-import-sort": simpleImportSort,
  },
  rules: {
    ...prettierPlugin.configs.recommended.rules,
    ...eslintConfigPrettier.rules,
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "no-undef": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "simple-import-sort/imports": ["error", {
      groups: [
        ["^react", "^@?\\w"],
        ["^@app", "^@modules", "^@pages", "^@shared", "^@"],
        ["^\\.\\./?", "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
        ["^.+\\.s?css$"],
      ]
    }],
    "simple-import-sort/exports": "error",
  },
});
