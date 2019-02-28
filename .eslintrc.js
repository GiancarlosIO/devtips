module.exports = {
  "extends": [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 8,
    "ecmaFeatures": {
      "impliedStrict": true,
      "classes": true,
      "jsx": true,
      "useJSXTextNode": true,
      "project": "./tsconfig.json",
      "tsconfigRootDir": "./",
      "warnOnUnsupportedTypeScriptVersion": true
    }
  },
  "plugins": [
    "import",
    "@typescript-eslint",
    "prettier",
    "react-hooks"
  ],
  "env": {
    "browser": true,
    "es6": true,
    "jest": true
  },
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "printWidth": 80,
        "jsxBracketSameLine": false,
        "trailingComma": "all",
        "arrowParens": "avoid"
      }
    ],
    "no-param-reassign": [
      2,
      {
        "props": false
      }
    ],
    "no-nested-ternary": "warn",
    "newline-after-var": [
      "error",
      "always"
    ],
    "no-underscore-dangle": "off",
    "no-console": "off",
    "max-len": 0,
    "import/prefer-default-export": 0,
    "import": 0,
    "func-names": 0,
    "space-before-function-paren": 0,
    "comma-dangle": 0,
    "import/extensions": 0,
    "consistent-return": 0,
    "prefer-const": [
      "error",
      {
        "destructuring": "all"
      }
    ],
    "jsx-a11y/no-static-element-interactions": "off",
    "react/jsx-filename-extension": [
      "error",
      {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
        ],
      },
    ],
    "react/prop-types": "off",
    "react/no-did-mount-set-state": 0,
    "react/no-array-index-key": 1,
    "jsx-a11y/no-static-element-interactions": "off",
    "react/sort-comp": [
      2,
      {
        "order": [
          "static-methods",
          "lifecycle",
          "everything-else",
          "render"
        ]
      }
    ],
    "react/display-name": 1
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "app/frontend/webpack/environments/development.js",
        "resolve": {
          "extensions": [
            ".js",
            ".ts",
            ".tsx",
            ".mjs",
            ".graphql"
          ]
        }
      }
    }
  },
  overrides: [{
    files: ["*.ts", "*.tsx"],
    /**
     * Typescript Rules
     * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
     * Enable your own typescript rules.
     */
    rules: {
      // Prevent TypeScript-specific constructs from being erroneously flagged as unused
      '@typescript-eslint/no-unused-vars'         : 'error',
      // Require PascalCased class and interface names
      '@typescript-eslint/class-name-casing'      : 'error',
      // Require a specific member delimiter style for interfaces and type literals
      // Default Semicolon style
      '@typescript-eslint/member-delimiter-style' : 'off',
      // Require a consistent member declaration order
      '@typescript-eslint/member-ordering'        : 'error',
      // Require consistent spacing around type annotations
      '@typescript-eslint/type-annotation-spacing': 'error',
    },
  }]
};
