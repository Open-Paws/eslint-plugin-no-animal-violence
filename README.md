# eslint-plugin-no-animal-violence

[![npm version](https://img.shields.io/npm/v/eslint-plugin-no-animal-violence.svg)](https://www.npmjs.com/package/eslint-plugin-no-animal-violence)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/eslint-plugin-no-animal-violence.svg)](https://www.npmjs.com/package/eslint-plugin-no-animal-violence)
[![Last commit](https://img.shields.io/github/last-commit/Open-Paws/eslint-plugin-no-animal-violence.svg)](https://github.com/Open-Paws/eslint-plugin-no-animal-violence/commits/main)

ESLint plugin that flags speciesist language patterns in JavaScript and TypeScript — string literals, template literals, and comments — and suggests precise, inclusive alternatives. One rule, ~70 patterns, zero configuration required.

The phrase dictionary is sourced from [no-animal-violence](https://github.com/Open-Paws/no-animal-violence), the canonical rule set for the Open Paws ecosystem, and is auto-generated via [project-compassionate-code](https://github.com/Open-Paws/project-compassionate-code). Language shapes thought: idioms like "wild goose chase" or "cattle vs. pets" normalize harm to animals. This plugin surfaces those phrases at lint time, in the editor, before they reach review.

> [!NOTE]
> This project is part of the [Open Paws](https://openpaws.ai) ecosystem — AI infrastructure for the animal liberation movement. [Explore the full platform →](https://github.com/Open-Paws)

---

## Example

```js
// Before — flagged by the rule

// wild goose chase looking for this bug
const msg = "don't beat a dead horse on this refactor";
const query = `this is like herding cats`;
const arch = "cattle vs. pets";
```

```js
// After — clean equivalents

// futile search looking for this bug
const msg = "don't belabor the point on this refactor";
const query = `this is like coordinating independent contributors`;
const arch = "ephemeral vs. persistent";
```

**ESLint output:**

```
src/utils.js
  1:4   warning  Avoid "wild goose chase". Consider: futile search                              no-animal-violence/no-speciesist-language
  2:20  warning  Avoid "beat a dead horse". Consider: belabor the point                         no-animal-violence/no-speciesist-language
  3:20  warning  Avoid "herding cats". Consider: coordinating independent contributors           no-animal-violence/no-speciesist-language
  4:16  warning  Avoid "cattle vs. pets". Consider: ephemeral vs. persistent                    no-animal-violence/no-speciesist-language
```

---

## Quickstart

**1. Install**

```bash
npm install --save-dev eslint-plugin-no-animal-violence
# or
yarn add -D eslint-plugin-no-animal-violence
# or
pnpm add -D eslint-plugin-no-animal-violence
```

Peer dependency: `eslint >= 7.0.0`

**2. Configure — ESLint flat config (ESLint 9+)**

```js
// eslint.config.js
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

Or spread the recommended preset:

```js
import noAnimalViolence from "eslint-plugin-no-animal-violence";

export default [
  {
    plugins: { "no-animal-violence": noAnimalViolence },
    rules: {
      ...noAnimalViolence.configs.recommended.rules,
    },
  },
];
```

**3. Configure — legacy config (ESLint 7/8)**

```json
{
  "plugins": ["no-animal-violence"],
  "rules": {
    "no-animal-violence/no-speciesist-language": "warn"
  }
}
```

**4. Run**

```bash
npx eslint .
```

---

## Rules

| Rule | What it detects | Fixable? | Default severity |
|------|----------------|----------|-----------------|
| `no-animal-violence/no-speciesist-language` | Speciesist phrases in string literals, template literals, and comments | No (suggestion) | warn |

### `no-animal-violence/no-speciesist-language`

Scans string literals, template literal quasis, and all comments (line and block) for phrases that normalize harm to animals or use animals as metaphors for inferior things. Reports each match with a suggested inclusive alternative.

- **Type:** `suggestion`
- **Fixable:** No — replacements require human judgment since the correct alternative depends on grammatical context.
- **Schema:** none (no configuration options)

#### Detected phrase categories

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

**Industry euphemisms** (flags language that softens harm to animals in agriculture)

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

## Documentation

- [no-animal-violence](https://github.com/Open-Paws/no-animal-violence) — canonical phrase dictionary (upstream source for all patterns)
- [project-compassionate-code](https://github.com/Open-Paws/project-compassionate-code) — generator that syncs patterns from the canonical source into this plugin

---

## Architecture

<details>
<summary>How the rule is structured</summary>

The plugin exposes a single rule: `no-speciesist-language`, implemented in `lib/rules/no-violent-language.js`.

**Pattern dictionary (`VIOLENT_ANIMAL_PHRASES`)** — a `Map` of lowercase phrase → inclusive alternative. This file is auto-generated from the [no-animal-violence](https://github.com/Open-Paws/no-animal-violence) canonical source. Do not edit it directly.

**`buildPattern()`** — called once at module load time. It escapes all phrase keys, sorts them longest-first (so longer phrases match before shorter substrings they contain), and compiles a single combined `RegExp` with the `gi` flags.

**AST visitor** — the `create()` function returns three visitors:

| Visitor | What it covers |
|---------|---------------|
| `Literal` | String literals (`"..."`, `'...'`) |
| `TemplateLiteral` | Each quasi element of a template string |
| `Program` | All line (`//`) and block (`/* */`) comments via `sourceCode.getAllComments()` |

**`checkText()`** — runs `PATTERN.exec()` in a loop against the node text. For each match it looks up the alternative and calls `context.report()` with `messageId: "avoidViolentAnimalLanguage"`. No auto-fix is offered because the correct replacement depends on grammatical context.

**`lib/index.js`** — exports `rules` and `configs.recommended`. The recommended config sets `no-speciesist-language` to `"warn"`.

</details>

---

## Contributing

Contributions are welcome.

**To add new phrases:** do not edit `lib/rules/no-violent-language.js` directly — that file is auto-generated. Propose new patterns upstream in [no-animal-violence](https://github.com/Open-Paws/no-animal-violence).

**To improve the plugin** (false positive handling, new AST node coverage, fix suggestions): open an issue first to align on approach, then submit a PR.

**Before submitting a PR:**

1. `npm test` — all existing tests must pass.
2. `npm run lint` — Biome must report no issues.
3. Keep PRs focused: one concern per PR.

---

## Ecosystem

This plugin is one delivery mechanism for the phrase dictionary in [no-animal-violence](https://github.com/Open-Paws/no-animal-violence). Other tools in the suite:

| Tool | Coverage |
|------|----------|
| [semgrep-rules-no-animal-violence](https://github.com/Open-Paws/semgrep-rules-no-animal-violence) | CI scanning, any language |
| [vale-no-animal-violence](https://github.com/Open-Paws/vale-no-animal-violence) | Prose and documentation |
| [vscode-no-animal-violence](https://github.com/Open-Paws/vscode-no-animal-violence) | VS Code editor extension |
| [no-animal-violence-pre-commit](https://github.com/Open-Paws/no-animal-violence-pre-commit) | Pre-commit hook |
| [no-animal-violence-action](https://github.com/Open-Paws/no-animal-violence-action) | GitHub Actions |
| This plugin | ESLint / JS / TS at dev time |

---

## License

MIT — see [LICENSE](./LICENSE).

Built by [Open Paws](https://openpaws.ai).

---

[Donate](https://openpaws.ai/donate) · [Discord](https://discord.gg/openpaws) · [openpaws.ai](https://openpaws.ai) · [Volunteer](https://openpaws.ai/volunteer)

---

```yaml
tech_stack: [javascript, eslint, nodejs]
project_status: alpha
difficulty: beginner
skill_tags: [eslint-plugin, linting, inclusive-language, speciesism, animal-advocacy]
related_repos:
  - Open-Paws/no-animal-violence
  - Open-Paws/semgrep-rules-no-animal-violence
  - Open-Paws/vale-no-animal-violence
  - Open-Paws/vscode-no-animal-violence
  - Open-Paws/no-animal-violence-pre-commit
  - Open-Paws/no-animal-violence-action
  - Open-Paws/project-compassionate-code
```
