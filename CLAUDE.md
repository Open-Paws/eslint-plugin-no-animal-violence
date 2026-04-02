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

## Organizational Context

**Strategic role (Lever 1 + Lever 3):** ESLint plugin covering JS/TS — the dominant language in the Open Paws platform (Astro 5 + React 19). Upstream dependency: `no-animal-violence` (canonical rule dictionary). Primary speciesist language detection mechanism for TypeScript development across the org.

**Current org priorities relevant to this repo:**
- Should be added to `open-paws-platform`'s ESLint config. Currently absent from platform CI. See `ecosystem/integration-todos.md` §27a.
- Bootcamp integration: include in bootcamp setup instructions — every developer who completes bootcamp should have this configured.
- Suite maintenance has **no named owner** as of 2026-04-02. Pattern additions and false-positive tuning are F/E-rank Guild quests.
- No test suite exists — this is the highest-priority gap. Adding tests is a concrete F-rank quest.

**Decisions affecting this repo:**
- 2026-03-25: ESLint is part of the platform's standard linting stack. This plugin should be integrated as a standard lint step.
- 2026-04-01: Pattern dictionary should sync from `no-animal-violence` canonical source. Verify the auto-generation from `project-compassionate-code` is still active.

## Related Repos

- [no-animal-violence](https://github.com/Open-Paws/no-animal-violence) — Canonical rule dictionary (upstream dependency)
- [vale-no-animal-violence](https://github.com/Open-Paws/vale-no-animal-violence) — Vale style package for prose
- [semgrep-rules-no-animal-violence](https://github.com/Open-Paws/semgrep-rules-no-animal-violence) — Multi-language CI scanning
- [vscode-no-animal-violence](https://github.com/Open-Paws/vscode-no-animal-violence) — VS Code extension

## Development Standards

### 10-Point Review Checklist (ranked by AI violation frequency)

1. **DRY** — The phrase map must not have duplicate entries. Each phrase appears once.
2. **Deep modules** — The plugin interface (rule name, config schema) must be simpler than the regex-building implementation.
3. **Single responsibility** — The AST visitor does one thing: scan for phrases in string literals and comments.
4. **Error handling** — Never silently swallow AST traversal errors. If the rule crashes on a file, ESLint must report it, not skip it.
5. **Information hiding** — The regex-building logic is an implementation detail. External consumers see only the ESLint rule interface.
6. **Ubiquitous language** — "farmed animal" not "livestock," "factory farm" not "farm." Never introduce synonyms for domain terms.
7. **Design for change** — Adding a new phrase should require only one line in the phrase map, not structural changes.
8. **Legacy velocity** — Before modifying the regex builder, verify the existing phrase map still produces correct output.
9. **Over-patterning** — Single-rule plugin is the right architecture. Resist splitting without a concrete reason.
10. **Test quality** — No test suite currently exists. Priority: add tests for every phrase in the map.

### Quality Gates

- **Verify loads**: `node -e "console.log(require('./lib/index.js'))"` before committing.
- **Desloppify**: `desloppify scan --path .` — minimum score ≥85.
- **Two-failure rule**: After two failed fixes on the same problem, stop and restart.

### Testing Methodology

- No test suite yet — this is a known gap. Spec-first when adding tests.
- Three questions per phrase: (1) Does the rule flag it in a string literal? (2) Does it flag it in a comment? (3) Does it avoid false positives on legitimate technical use?

### Seven Concerns — Repo-Specific Notes

1. **Testing** — No test suite. Highest-priority improvement for this repo.
2. **Security** — Ensure the plugin does not execute arbitrary code from scanned files.
3. **Privacy** — Not applicable.
4. **Cost optimization** — Runs locally in developer IDE/CI. No compute cost.
5. **Advocacy domain** — The phrase map is the canonical JS/TS expression of movement language standards.
6. **Accessibility** — Diagnostic messages must be clear to non-native English speakers.
7. **Emotional safety** — Suggestions should not require developers to engage with graphic content to understand the fix.

### Structured Coding Reference

For tool-specific AI coding instructions (Claude Code rules, Cursor MDC, Copilot, Windsurf, etc.), copy the corresponding directory from `structured-coding-with-ai` into this project root.
