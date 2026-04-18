# AGENTS.md — eslint-plugin-no-animal-violence

## Summary

This is a single-rule ESLint plugin (v0.1.0) that detects speciesist phrases — idioms, tech jargon, and industry euphemisms that normalize harm to animals — in JavaScript and TypeScript string literals, template literals, and comments. It reports each match with a precise inclusive alternative. The phrase dictionary is auto-generated from the [no-animal-violence](https://github.com/Open-Paws/no-animal-violence) canonical source via [project-compassionate-code](https://github.com/Open-Paws/project-compassionate-code). Do not edit the phrase map directly.

---

## Status

**🟡 Active Development** — Core rule is functional and published to npm. Known gaps:

- No per-phrase test suite (highest-priority improvement; see TODOs below)
- The `configs.recommended` object in `lib/index.js` references the plugin name `"speciesism"` instead of `"no-animal-violence"` — this is a latent bug that will cause the spread-recommended pattern to fail for users who rely on that export
- Not yet integrated into the Open Paws platform ESLint config (tracked in ecosystem integration todos §27a)

Any change to this repo may affect every JS/TS project in the org that runs this plugin. The phrase map is consumed by the `mcp-server-nav-language` runtime enforcement layer and the `lbr8-mcp-constraints` middleware, so phrase additions/removals have cross-system implications beyond ESLint.

---

## Key Files

| File | Role |
|------|------|
| `lib/index.js` | Plugin entry point — exports `rules` object and `configs.recommended` |
| `lib/rules/no-violent-language.js` | Core rule: phrase map (`VIOLENT_ANIMAL_PHRASES`), regex builder (`buildPattern`), AST visitor (`create`) |
| `tests/placeholder.test.js` | Smoke tests using Node built-in test runner — verifies plugin shape and one phrase detection |
| `package.json` | Package metadata; peer dep `eslint >=7`; uses Biome for linting |
| `biome.json` | Biome formatter/linter config |
| `CLAUDE.md` | Developer context, org priorities, and seven concerns for this repo |

---

## Install and Test Commands

```bash
# Install dependencies
npm install

# Run the test suite (Node built-in test runner)
npm test

# Lint the plugin source with Biome
npm run lint

# Verify the plugin loads and inspect its exports
node -e "console.log(require('./lib/index.js'))"

# Smoke-test the rule against an ad-hoc file
echo '// wild goose chase' > /tmp/test.js && npx eslint --rulesdir lib/rules /tmp/test.js
```

---

## Architecture

### Plugin structure

```
lib/
  index.js                  # Entry point: wires rule name → rule impl, exports recommended config
  rules/
    no-violent-language.js  # The rule implementation
tests/
  placeholder.test.js       # Smoke tests (Node test runner, no external deps)
```

### Rule lifecycle

1. **Load time** — `buildPattern()` constructs one `RegExp` from all keys in `VIOLENT_ANIMAL_PHRASES`, sorted longest-first so "kill two birds with one stone" matches before "kill". The regex uses `\b` word boundaries and the `gi` flags.

2. **Lint time** — ESLint calls `create(context)` once per file. The returned visitor object has three handlers:
   - `Literal(node)` — checks `node.value` when it is a string
   - `TemplateLiteral(node)` — iterates `node.quasis` and checks each `quasi.value.raw`
   - `Program()` — retrieves all comments via `sourceCode.getAllComments()` and checks each `comment.value`; calculates per-match `loc` offsets so ESLint reports the position of the phrase, not just the comment start

3. **Reporting** — each match calls `context.report()` with `messageId: "avoidViolentAnimalLanguage"` and the phrase + alternative injected as template data. No `fix` function is provided (see rationale in README).

### Auto-generation

`lib/rules/no-violent-language.js` carries the header comment:
```
// AUTO-GENERATED from project-compassionate-code. Do not edit directly.
```
The generator in [project-compassionate-code](https://github.com/Open-Paws/project-compassionate-code) reads the canonical JSON from [no-animal-violence](https://github.com/Open-Paws/no-animal-violence) and emits this file. Verify the generation pipeline is still active before manually patching phrases.

### Known bug in recommended config

`lib/index.js` currently exports:
```js
configs: {
  recommended: {
    plugins: ["speciesism"],          // ← wrong name
    rules: {
      "speciesism/no-speciesist-language": "warn",  // ← wrong prefix
    },
  },
},
```
The plugin is registered under `"no-animal-violence"`, not `"speciesism"`. Users who spread `noAnimalViolence.configs.recommended` in their flat config will get a broken rule reference. The README documents a working workaround (manually spreading just the rules). Fix: update both strings to `"no-animal-violence"`.

---

## Integration Points

| Downstream | How it uses this plugin |
|------------|------------------------|
| Open Paws platform (Astro 5 + React 19) | Should be in `eslint.config.js` — currently absent (tracked §27a) |
| Developer bootcamp | Should be in setup instructions so every new developer lints on day one |
| `mcp-server-nav-language` | Shares the same phrase space at runtime (separate implementation) |
| `lbr8-mcp-constraints` | Bundles 12 offline NAV patterns as `StaticConstraintSource` middleware |
| `mcp-server-aha-evaluation` | Uses NAV rules as Stage 1 of content evaluation pipeline |
| Audit-to-dispatch (decision #37) | NAV violations found in ecosystem audits auto-dispatch as fix tasks |
| `no-animal-violence-pre-commit` | Pre-commit hook; separate tool, same canonical dictionary |

---

## Safe vs. Risky Changes

### Safe

- Adding documentation, comments, or examples
- Fixing the `configs.recommended` bug (two string replacements in `lib/index.js` — change `"speciesism"` to `"no-animal-violence"` in both places)
- Adding tests in `tests/` using the existing Node test runner pattern
- Adjusting Biome config (`biome.json`) for formatting preferences

### Requires care

- **Changing `buildPattern()`** — the sort order and word-boundary logic prevent shorter phrases from stealing matches from longer ones; verify all multi-word phrases still resolve correctly after any regex change
- **Modifying the `Program` visitor's offset calculator** — comment location math is subtle; a one-off error causes ESLint to point to the wrong line/column
- **Bumping the ESLint peer dependency floor** — ESLint 7/8 and ESLint 9 have different `context` APIs; the rule defensively handles both (`context.getSourceCode ? ... : context.sourceCode`)

### Risky — do not do without explicit decision

- **Editing `VIOLENT_ANIMAL_PHRASES` directly** — this file is auto-generated; manual edits will be overwritten on the next generation run and create divergence from the canonical source
- **Adding auto-fix** — requires a survey of every phrase in context; incorrect auto-fixes silently corrupt source code
- **Splitting into multiple rules** — the single-rule architecture is an explicit design decision (see CLAUDE.md §Over-patterning); discuss before restructuring
- **Changing the exported rule name** (`no-speciesist-language`) — this is a breaking change for all downstream consumers

---

## TODOs

Priority order from CLAUDE.md and org decisions:

1. **Fix `configs.recommended` plugin name** — two-line change, immediate impact for flat-config users
2. **Full test suite** — one test per phrase (flag in literal, flag in comment, no false positive); use `RuleTester` from `eslint` package for end-to-end rule testing rather than the current mock-context approach
3. **Integrate into platform ESLint config** — add to `Open-Paws/platform` `eslint.config.js` and CI (tracked §27a)
4. **Add to bootcamp setup instructions** — every developer should have this configured from day one
5. **Verify auto-generation pipeline** — confirm `project-compassionate-code` is still syncing the phrase map from `no-animal-violence`
6. **Named owner** — suite maintenance has no named owner as of 2026-04-02; assign a maintainer
