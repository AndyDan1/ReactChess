exports = {
  root: true,
  plugins: [
    "eslint-plugin",
    "internal-rules"
  ],
  extends: [
    "eslint"
  ],
  parserOptions: {
    ecmaVersion: 2021
  },

  settings: {
    jsdoc: {
      mode: "typescript"
    }
  },
  rules: {
    "internal-rules/multiline-comment-style": "error"
  },
  overrides: [
    {
      files: [
        "tools/*.js"
      ],
      rules: {
        "no-console": "off"
      }
    },
    {
      files: [
        "lib/rules/*",
        "tools/internal-rules/*"
      ],
      excludedFiles: [
        "index.js"
      ],
      extends: [
        "plugin:eslint-plugin/rules-recommended"
      ],
      rules: {
        "eslint-plugin/prefer-message-ids": "error",
        "eslint-plugin/prefer-placeholders": "error",
        "eslint-plugin/prefer-replace-text": "error",
        "eslint-plugin/report-message-format": [
          "error",
          "[^a-z].*\\.$"
        ],
        "eslint-plugin/require-meta-docs-description": "error",
        "internal-rules/no-invalid-meta": "error"
      }
    },
    {
      files: [
        "lib/rules/*"
      ],
      excludedFiles: [
        "index.js"
      ],
      rules: {
        "eslint-plugin/require-meta-docs-url": [
          "error",
          {
            pattern: "https://eslint.org/docs/rules/{{name}}"
          }
        ]
      }
    },
    {
      files: [
        "tests/lib/rules/*",
        "tests/tools/internal-rules/*"
      ],
      extends: [
        "plugin:eslint-plugin/tests-recommended"
      ],
      rules: {
        "eslint-plugin/prefer-output-null": "error",
        "eslint-plugin/test-case-property-ordering": "error",
        "eslint-plugin/test-case-shorthand-strings": "error"
      }
    },
    {
      files: [
        "tests/**/*"
      ],
      env: {
        mocha: true
      },
      rules: {
        "no-restricted-syntax": [
          "error",
          {
            selector: "CallExpression[callee.object.name='assert'][callee.property.name='doesNotThrow']",
            message: "`assert.doesNotThrow()` should be replaced with a comment next to the code."
          }
        ]
      }
    },
    {
      files: [
        "lib/*"
      ],
      excludedFiles: [
        "lib/unsupported-api.js"
      ],
      rules: {
        "node/no-restricted-require": [
          "error",
          [
            ...createInternalFilesPatterns()
          ]
        ]
      }
    },
    {
      files: [
        INTERNAL_FILES.CLI_ENGINE_PATTERN
      ],
      rules: {
        "node/no-restricted-require": [
          "error",
          [
            ...createInternalFilesPatterns(INTERNAL_FILES.CLI_ENGINE_PATTERN)
          ]
        ]
      }
    },
    {
      files: [
        INTERNAL_FILES.LINTER_PATTERN
      ],
      rules: {
        "node/no-restricted-require": [
          "error",
          [
            ...createInternalFilesPatterns(INTERNAL_FILES.LINTER_PATTERN),
            "fs",
            resolveAbsolutePath(
            "lib/cli-engine/index.js"
            ),
            resolveAbsolutePath(
            "lib/rule-tester/index.js"
            )
          ]
        ]
      }
    },
    {
      files: [
        INTERNAL_FILES.RULES_PATTERN
      ],
      rules: {
        "node/no-restricted-require": [
          "error",
          [
            ...createInternalFilesPatterns(INTERNAL_FILES.RULES_PATTERN),
            "fs",
            resolveAbsolutePath(
            "lib/cli-engine/index.js"
            ),
            resolveAbsolutePath(
            "lib/linter/index.js"
            ),
            resolveAbsolutePath(
            "lib/rule-tester/index.js"
            ),
            resolveAbsolutePath(
            "lib/source-code/index.js"
            )
          ]
        ]
      }
    },
    {
      files: [
        "lib/shared/**/*"
      ],
      rules: {
        "node/no-restricted-require": [
          "error",
          [
            ...createInternalFilesPatterns(),
            resolveAbsolutePath(
            "lib/cli-engine/index.js"
            ),
            resolveAbsolutePath(
            "lib/linter/index.js"
            ),
            resolveAbsolutePath(
            "lib/rule-tester/index.js"
            ),
            resolveAbsolutePath(
            "lib/source-code/index.js"
            )
          ]
        ]
      }
    },
    {
      files: [
        INTERNAL_FILES.SOURCE_CODE_PATTERN
      ],
      rules: {
        "node/no-restricted-require": [
          "error",
          [
            ...createInternalFilesPatterns(INTERNAL_FILES.SOURCE_CODE_PATTERN),
            "fs",
            resolveAbsolutePath(
            "lib/cli-engine/index.js"
            ),
            resolveAbsolutePath(
            "lib/linter/index.js"
            ),
            resolveAbsolutePath(
            "lib/rule-tester/index.js"
            ),
            resolveAbsolutePath(
            "lib/rules/index.js"
            )
          ]
        ]
      }
    },
    {
      files: [
        INTERNAL_FILES.RULE_TESTER_PATTERN
      ],
      rules: {
        "node/no-restricted-require": [
          "error",
          [
            ...createInternalFilesPatterns(INTERNAL_FILES.RULE_TESTER_PATTERN),
            resolveAbsolutePath(
            "lib/cli-engine/index.js"
            )
          ]
        ]
      }
    }
  ]
}