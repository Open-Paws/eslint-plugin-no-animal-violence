"use strict";

/**
 * Map of speciesist phrases to their inclusive alternatives.
 * Keys are lowercase for case-insensitive matching.
 */
const SPECIESIST_PHRASES = new Map([
  ["kill two birds with one stone", "accomplish two things at once"],
  ["beat a dead horse", "belabor the point"],
  ["bring home the bacon", "bring home the results"],
  ["guinea pig", "test subject"],
  ["more than one way to skin a cat", "more than one way to solve this"],
  ["let the cat out of the bag", "reveal the secret"],
  ["open a can of worms", "create a complicated situation"],
  ["wild goose chase", "pointless pursuit"],
  ["sacred cow", "unquestioned belief"],
  ["cattle vs pets", "ephemeral vs persistent"],
  ["canary deployment", "progressive rollout"],
  ["monkey patch", "runtime patch"],
  ["dogfooding", "self-hosting"],
]);

/**
 * Build a combined regex that matches any of the speciesist phrases.
 * Uses word boundaries where appropriate and is case-insensitive.
 */
function buildPattern() {
  const escaped = Array.from(SPECIESIST_PHRASES.keys()).map((phrase) =>
    phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  // Sort longest-first so longer phrases match before shorter substrings
  escaped.sort((a, b) => b.length - a.length);
  return new RegExp(`\\b(?:${escaped.join("|")})\\b`, "gi");
}

const PATTERN = buildPattern();

/**
 * Check a string for speciesist phrases and report any matches.
 */
function checkText(context, node, text, offsetCalculator) {
  PATTERN.lastIndex = 0;
  let match;
  while ((match = PATTERN.exec(text)) !== null) {
    const phrase = match[0].toLowerCase();
    const alternative = SPECIESIST_PHRASES.get(phrase);
    if (alternative) {
      const loc = offsetCalculator
        ? offsetCalculator(match.index)
        : node.loc.start;

      context.report({
        node,
        loc,
        messageId: "avoidSpeciesistLanguage",
        data: {
          phrase: match[0],
          alternatives: alternative,
        },
      });
    }
  }
}

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Detect and discourage speciesist language in comments and strings",
      category: "Best Practices",
      recommended: true,
      url: "https://github.com/Open-Paws/eslint-plugin-speciesism#no-speciesist-language",
    },
    messages: {
      avoidSpeciesistLanguage:
        'Avoid "{{phrase}}". Consider: {{alternatives}}',
    },
    schema: [],
  },

  create(context) {
    const sourceCode = context.getSourceCode
      ? context.getSourceCode()
      : context.sourceCode;

    return {
      // Check string literals
      Literal(node) {
        if (typeof node.value === "string") {
          checkText(context, node, node.value);
        }
      },

      // Check template literal quasi elements
      TemplateLiteral(node) {
        node.quasis.forEach((quasi) => {
          checkText(context, quasi, quasi.value.raw);
        });
      },

      // Check all comments when the program node is visited
      Program() {
        const comments = sourceCode.getAllComments
          ? sourceCode.getAllComments()
          : (sourceCode.comments || []);

        comments.forEach((comment) => {
          checkText(context, comment, comment.value, (matchIndex) => {
            // Calculate approximate location within the comment
            const lines = comment.value.substring(0, matchIndex).split("\n");
            const lineOffset = lines.length - 1;
            const columnOffset =
              lineOffset === 0
                ? matchIndex + (comment.type === "Block" ? 2 : 2)
                : lines[lines.length - 1].length;

            return {
              line: comment.loc.start.line + lineOffset,
              column:
                lineOffset === 0
                  ? comment.loc.start.column + columnOffset
                  : columnOffset,
            };
          });
        });
      },
    };
  },
};
