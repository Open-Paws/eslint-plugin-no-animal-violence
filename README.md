# eslint-plugin-no-animal-violence

ESLint plugin for detecting speciesist language in JavaScript and TypeScript comments and strings.

Language shapes thought. Many common programming idioms normalize violence against animals — "kill two birds with one stone," "beat a dead horse," "monkey patch." This plugin flags speciesist phrases and suggests inclusive alternatives.

## Installation

```bash
npm install --save-dev eslint-plugin-no-animal-violence
```

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

Or use the recommended config:

```js
import noAnimalViolence from "eslint-plugin-no-animal-violence";

export default [
  {
    plugins: { "no-animal-violence": noAnimalViolence },
    ...noAnimalViolence.configs.recommended,
  },
];
```

### Legacy Config (.eslintrc) — ESLint 7/8

```json
{
  "plugins": ["no-animal-violence"],
  "rules": {
    "no-animal-violence/no-speciesist-language": "warn"
  }
}
```

Or extend the recommended config:

```json
{
  "extends": ["plugin:no-animal-violence/recommended"]
}
```

## Rules

### `no-animal-violence/no-speciesist-language`

Detects speciesist phrases in comments and string literals and suggests alternatives.

**Type:** suggestion

**Default severity:** warn (in recommended config)

#### Detected Phrases

| Speciesist Phrase | Suggested Alternative |
| --- | --- |
| kill two birds with one stone | accomplish two things at once |
| beat a dead horse | belabor the point |
| more than one way to skin a cat | more than one way to solve this |
| let the cat out of the bag | reveal the secret |
| open a can of worms | create a complicated situation |
| wild goose chase | futile search |
| like shooting fish in a barrel | trivially easy |
| flog a dead horse | belabor the point |
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
| sacred cow | unquestioned belief |
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
| kill process | terminate the process |
| kill the server | stop the server |
| nuke | delete completely |
| abort | cancel |
| cull | remove |
| master/slave | primary/replica |
| whitelist/blacklist | allowlist/denylist |
| grandfathered | legacy |

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
