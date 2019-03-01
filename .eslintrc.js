module.exports = {
  "extends": [
    "airbnb",
    // "plugin:@typescript-eslint/recommended",
    "prettier",
    // "prettier/@typescript-eslint",
    "prettier/react"
  ],
  // "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 8,
    "ecmaFeatures": {
      "impliedStrict": true,
      "classes": true,
      // "jsx": true,
      // "useJSXTextNode": true,
      // "project": "./tsconfig.json",
      // "tsconfigRootDir": "./",
      // "warnOnUnsupportedTypeScriptVersion": true
    }
  },
  "plugins": [
    "import",
    // "@typescript-eslint",
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
    "import": 0,
    "import/prefer-default-export": 0,
    "import/extensions": 0,
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": false, "peerDependencies": false}],
    "func-names": 0,
    "space-before-function-paren": 0,
    "comma-dangle": 0,
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
    // extends is not supported yet in overrides
    // "extends": [
    //   "airbnb",
    //   "plugin:@typescript-eslint/recommended",
    //   "prettier",
    //   "prettier/@typescript-eslint",
    //   "prettier/react"
    // ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "project": "./tsconfig.json",
      "tsconfigRootDir": "./",
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
    /**
     * Typescript Rules
     * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
     * Enable your own typescript rules.
     */
    rules: {
      // prettier/@typescript-eslint rules
      "@typescript-eslint/indent": "off",
      "@typescript-eslint/member-delimiter-style": "off",
      "@typescript-eslint/type-annotation-spacing": "off",
      // plugin:@typescript-eslint/recommended rules
      "@typescript-eslint/restrict-plus-operands": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/prefer-namespace-keyword": "error",
      "@typescript-eslint/prefer-interface": "error",
      "@typescript-eslint/prefer-function-type": "error",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/no-useless-constructor": "error",
      "@typescript-eslint/no-use-before-define": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-unnecessary-qualifier": "error",
      "@typescript-eslint/no-type-alias": "error",
      "@typescript-eslint/no-triple-slash-reference": "error",
      "@typescript-eslint/no-this-alias": "error",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-parameter-properties": "error",
      "@typescript-eslint/no-object-literal-type-assertion": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-for-in-array": "error",
      "@typescript-eslint/no-extraneous-class": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-array-constructor": "error",
      "@typescript-eslint/no-angle-bracket-type-assertion": "error",
      "@typescript-eslint/member-ordering": "error",
      "@typescript-eslint/member-naming": "error",
      "@typescript-eslint/interface-name-prefix": "error",
      "@typescript-eslint/generic-type-naming": "error",
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/class-name-casing": "error",
      "@typescript-eslint/camelcase": "error",
      "@typescript-eslint/ban-ts-ignore": "error",
      "@typescript-eslint/ban-types": "error",
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/adjacent-overload-signatures": "error"
    },
  }]
};
