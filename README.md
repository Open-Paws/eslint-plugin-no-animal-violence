# eslint-plugin-speciesism

ESLint plugin for detecting speciesist language in JavaScript and TypeScript comments and strings.

Language shapes thought. Many common programming idioms normalize violence against animals — "kill two birds with one stone," "beat a dead horse," "monkey patch." This plugin flags speciesist phrases and suggests inclusive alternatives.

## Installation

```bash
npm install --save-dev eslint-plugin-speciesism
```

## Configuration

### ESLint Flat Config (eslint.config.js) — ESLint 9+

```js
import speciesism from "eslint-plugin-speciesism";

export default [
  {
    plugins: { speciesism },
    rules: {
      "speciesism/no-speciesist-language": "warn",
    },
  },
];
```

Or use the recommended config:

```js
import speciesism from "eslint-plugin-speciesism";

export default [
  {
    plugins: { speciesism },
    ...speciesism.configs.recommended,
  },
];
```

### Legacy Config (.eslintrc) — ESLint 7/8

```json
{
  "plugins": ["speciesism"],
  "rules": {
    "speciesism/no-speciesist-language": "warn"
  }
}
```

Or extend the recommended config:

```json
{
  "extends": ["plugin:speciesism/recommended"]
}
```

## Rules

### `speciesism/no-speciesist-language`

Detects speciesist phrases in comments and string literals and suggests alternatives.

**Type:** suggestion

**Default severity:** warn (in recommended config)

#### Detected Phrases

| Speciesist Phrase | Suggested Alternative |
| --- | --- |
| kill two birds with one stone | accomplish two things at once |
| beat a dead horse | belabor the point |
| bring home the bacon | bring home the results |
| guinea pig | test subject |
| more than one way to skin a cat | more than one way to solve this |
| let the cat out of the bag | reveal the secret |
| open a can of worms | create a complicated situation |
| wild goose chase | pointless pursuit |
| sacred cow | unquestioned belief |
| cattle vs pets | ephemeral vs persistent |
| canary deployment | progressive rollout |
| monkey patch | runtime patch |
| dogfooding | self-hosting |

#### Examples

**Bad:**

```js
// TODO: kill two birds with one stone by refactoring both modules
const message = "Let's not beat a dead horse";
function monkeyPatch() {} // monkey patch the prototype
```

**Good:**

```js
// TODO: accomplish two things at once by refactoring both modules
const message = "Let's not belabor the point";
function runtimePatch() {} // runtime patch the prototype
```

## Contributing

Contributions welcome. If you know of speciesist phrases we're missing, open an issue or PR.

## About

Built by [Open Paws](https://openpaws.ai) — AI infrastructure for animal liberation.

## License

MIT
