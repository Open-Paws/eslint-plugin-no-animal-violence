const rules = require("./rules/no-violent-language");

module.exports = {
	rules: {
		"no-speciesist-language": rules,
	},
	configs: {
		recommended: {
			plugins: ["no-animal-violence"],
			rules: {
				"no-animal-violence/no-speciesist-language": "warn",
			},
		},
	},
};
