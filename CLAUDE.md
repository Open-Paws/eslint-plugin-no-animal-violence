# eslint-plugin-no-animal-violence

ESLint plugin that detects speciesist language in JavaScript and TypeScript comments and string literals. Part of the Open Paws speciesist language detection suite. Supports ESLint 7+ (legacy config) and ESLint 9+ (flat config).

## Quick Start

```bash
# Install (peer dependency: eslint >=7)
npm install --save-dev eslint-plugin-no-animal-violence

# Run ESLint with the plugin configured (see README for config examples)
npx eslint .
```

## Architecture

Single-rule ESLint plugin. The rule `no-speciesist-language` builds a combined regex from a phrase map, then walks the AST checking string literals, template literals, and comments. Matches are reported as suggestions with alternatives.

Entry point (`lib/index.js`) exports:
- `rules` object with the `no-speciesist-language` rule
- `configs.recommended` preset (sets severity to `warn`)

## Key Files

| File | Description |
|------|-------------|
| `lib/index.js` | Plugin entry point; exports rules and configs |
| `lib/rules/no-violent-language.js` | Core rule: phrase map, regex builder, AST visitor |
| `package.json` | Package metadata (v0.1.0, peer dep eslint >=7) |

## Development Commands

```bash
# Install dependencies
npm install

# Run ESLint on a test file
npx eslint --rulesdir lib/rules test-file.js

# Verify the plugin loads
node -e "console.log(require('./lib/index.js'))"
```

## Related Repos

- [no-animal-violence](https://github.com/Open-Paws/no-animal-violence) — Multi-tool rule definitions (woke, alex, Vale)
- [vale-no-animal-violence](https://github.com/Open-Paws/vale-no-animal-violence) — Vale style package
