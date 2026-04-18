# eslint-plugin-no-animal-violence

> **Status: 🟡 Active Development** — v0.1.0. Core rule is functional; test suite is a known gap.

ESLint plugin that detects speciesist language in JavaScript and TypeScript **string literals, template literals, and comments**, and suggests inclusive alternatives. Part of the [Open Paws](https://openpaws.ai) speciesist language detection suite alongside [semgrep-rules-no-animal-violence](https://github.com/Open-Paws/semgrep-rules-no-animal-violence), [vale-no-animal-violence](https://github.com/Open-Paws/vale-no-animal-violence), and the [VS Code extension](https://github.com/Open-Paws/vscode-no-animal-violence).

Language shapes thought. Many common programming idioms normalize violence against animals — "wild goose chase," "code monkey," "cattle vs. pets." This plugin surfaces those phrases at lint time and proposes precise, neutral alternatives so the codebase reflects the values of the people building it.

The phrase dictionary is sourced from [no-animal-violence](https://github.com/Open-Paws/no-animal-violence) — the canonical rule set for the whole Open Paws ecosystem — and is auto-generated via [project-compassionate-code](https://github.com/Open-Paws/project-compassionate-code).

---

## Installation

```bash
npm install --save-dev eslint-plugin-no-animal-violence
# or
yarn add -D eslint-plugin-no-animal-violence
# or
pnpm add -D eslint-plugin-no-animal-violence
```

**Peer dependency:** `eslint >= 7.0.0`

---

## Configuration

### ESLint Flat Config (eslint.config.js) — ESLint 9+

```js
import noAnimalViolence from "eslint-plugin-no-animal-violence";

export default [
  {
    plugins: { "no-animal-violence": noAnimalViolence },
    rules: {
      "no-animal-violence/no-speciesist-language": "warn",
    },
  },
];
```

Or spread the recommended preset (sets severity to `warn` automatically):

```js
import noAnimalViolence from "eslint-plugin-no-animal-violence";

export default [
  {
    plugins: { "no-animal-violence": noAnimalViolence },
    rules: {
      ...noAnimalViolence.configs.recommended.rules,
      // override severity if needed:
      // "no-animal-violence/no-speciesist-language": "error",
    },
  },
];
```

### Legacy Config (.eslintrc / .eslintrc.json) — ESLint 7/8

```json
{
  "plugins": ["no-animal-violence"],
  "rules": {
    "no-animal-violence/no-speciesist-language": "warn"
  }
}
```

---

## Rules

| Rule | What it detects | Fixable? | Severity (recommended) |
|------|----------------|----------|------------------------|
| `no-animal-violence/no-speciesist-language` | Speciesist phrases in string literals, template literals, and comments | No (suggestion) | warn |

### `no-animal-violence/no-speciesist-language`

Scans string literals, template literal quasis, and all comments (line and block) for phrases that normalize harm to animals or use animals as metaphors for inferior things. Reports each match with a suggested inclusive alternative.

**Type:** `suggestion`
**Fixable:** No — replacements require human judgment since the alternative may need grammatical adjustment.
**Schema:** none (no configuration options)

#### Detected Phrases and Alternatives

**Idioms and colloquialisms**

| Phrase | Alternative |
|--------|-------------|
| kill two birds with one stone | accomplish two things at once |
| beat a dead horse | belabor the point |
| flog a dead horse | belabor the point |
| more than one way to skin a cat | more than one way to solve this |
| let the cat out of the bag | reveal the secret |
| open a can of worms | create a complicated situation |
| wild goose chase | futile search |
| like shooting fish in a barrel | trivially easy |
| there are bigger fish to fry | more important matters to address |
| guinea pig | test subject |
| hold your horses | wait a moment |
| the elephant in the room | the obvious issue |
| straight from the horse's mouth | directly from the source |
| bring home the bacon | bring home the results |
| take the bull by the horns | face the challenge head-on |
| like lambs to the slaughter | without resistance |
| no room to swing a cat | very cramped |
| red herring | distraction |
| curiosity killed the cat | curiosity backfired |
| like a chicken with its head cut off | in a panic |
| your goose is cooked | you're in trouble |
| throw someone to the wolves | abandon to criticism |
| hook, line, and sinker | completely |
| clip someone's wings | restrict someone's freedom |
| the straw that broke the camel's back | the tipping point |
| a bird in the hand is worth two in the bush | a sure thing beats a possibility |
| eat crow | admit being wrong |
| fight like cats and dogs | constantly argue |
| take the bait | fall for it |
| don't count your chickens before they hatch | don't assume success prematurely |
| don't be a chicken | don't hesitate |
| scapegoat | blame target |
| rat race | daily grind |
| dead cat bounce | temporary rebound |
| dog-eat-dog | ruthlessly competitive |
| whack-a-mole | recurring problem |
| cash cow | profit center |
| sacrificial lamb | expendable person |
| sitting duck | easy target |
| open season | free-for-all |
| put out to pasture | retire |
| dead duck | lost cause |
| sacred cow | unquestioned belief |

**Tech jargon**

| Phrase | Alternative |
|--------|-------------|
| pig | resource-intensive |
| cowboy coding | undisciplined coding |
| code monkey | developer |
| badger someone | pester |
| ferret out | uncover |
| cattle vs. pets | ephemeral vs. persistent |
| pet project | side project |
| canary in a coal mine | early warning signal |
| dogfooding | self-hosting |
| herding cats | coordinating independent contributors |
| go on a fishing expedition | exploratory investigation |
| kill process | terminate the process |
| kill the server | stop the server |
| nuke | delete completely |
| abort | cancel |
| cull | remove |
| master/slave | primary/replica |
| whitelist/blacklist | allowlist/denylist |
| grandfathered | legacy |

**Industry euphemisms** (flags language that normalizes harm by softening it)

| Phrase | Alternative |
|--------|-------------|
| livestock | farmed animals |
| poultry | farmed birds |
| broiler | chicken raised for meat |
| spent hen | discarded hen |
| humane slaughter | slaughter |
| processing plant | slaughterhouse |
| gestation crate | pregnancy cage |
| farrowing crate | birthing cage |
| battery cage | small wire cage |
| depopulation | mass killing |

---

## Examples

### Violations flagged by the rule

```js
// ❌ comment: wild goose chase looking for this bug
const msg = "don't beat a dead horse on this refactor";
const query = `this is like herding cats`;
function monitorDeploy() {
  const canary = "canary in a coal mine"; // ❌
}
```

### Clean equivalents

```js
// ✓ futile search looking for this bug
const msg = "don't belabor the point on this refactor";
const query = `this is like coordinating independent contributors`;
function monitorDeploy() {
  const earlySignal = "early warning signal";
}
```

### ESLint output

```
src/utils.js
  3:14  warning  Avoid "wild goose chase". Consider: futile search  no-animal-violence/no-speciesist-language
  7:22  warning  Avoid "herding cats". Consider: coordinating independent contributors  no-animal-violence/no-speciesist-language
```

---

## How It Works

The rule builds a single combined `RegExp` from the phrase map at load time (sorted longest-first to prevent shorter substrings matching inside longer phrases). At lint time the AST visitor checks:

1. **`Literal` nodes** — string literals (`"..."` and `'...'`)
2. **`TemplateLiteral` nodes** — each quasi element of a template string
3. **`Program` node** — all comments (line `//` and block `/* */`) retrieved via `sourceCode.getAllComments()`

No auto-fix is offered. Because many phrases appear mid-sentence, the correct replacement depends on grammatical context that the linter cannot determine automatically. The diagnostic message names the exact phrase and lists the preferred alternative(s) so the developer can apply the change with full context.

---

## Relationship to the no-animal-violence Canonical Rules

This plugin is **one delivery mechanism** for the same phrase dictionary maintained in [no-animal-violence](https://github.com/Open-Paws/no-animal-violence). The phrase map in `lib/rules/no-violent-language.js` is auto-generated from that upstream source via [project-compassionate-code](https://github.com/Open-Paws/project-compassionate-code). Do not add phrases directly to `no-violent-language.js` — add them to the canonical source and let the generator sync them.

Other tools in the same ecosystem:

| Tool | Coverage |
|------|----------|
| [semgrep-rules-no-animal-violence](https://github.com/Open-Paws/semgrep-rules-no-animal-violence) | CI scanning, any language |
| [vale-no-animal-violence](https://github.com/Open-Paws/vale-no-animal-violence) | Prose and documentation |
| [vscode-no-animal-violence](https://github.com/Open-Paws/vscode-no-animal-violence) | VS Code editor extension |
| [no-animal-violence-pre-commit](https://github.com/Open-Paws/no-animal-violence-pre-commit) | Pre-commit hook |
| [no-animal-violence-action](https://github.com/Open-Paws/no-animal-violence-action) | GitHub Actions |
| This plugin | ESLint / JS / TS at dev time |

---

## Contributing

Contributions are welcome. Before opening a PR:

1. Do not edit `lib/rules/no-violent-language.js` directly to add phrases — that file is auto-generated. Propose new patterns upstream in [no-animal-violence](https://github.com/Open-Paws/no-animal-violence).
2. For plugin improvements (false positive handling, fix suggestions, new AST node coverage) open an issue first to align on approach.
3. Run `npm test` — all existing tests must pass.
4. Run `npm run lint` — Biome must report no issues.

---

## About

Built by [Open Paws](https://openpaws.ai) — AI infrastructure for animal liberation.

## License

MIT
