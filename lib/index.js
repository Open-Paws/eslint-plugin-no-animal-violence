"use strict";

const rules = require("./rules/no-speciesist-language");

module.exports = {
  rules: {
    "no-speciesist-language": rules,
  },
  configs: {
    recommended: {
      plugins: ["speciesism"],
      rules: {
        "speciesism/no-speciesist-language": "warn",
      },
    },
  },
};
