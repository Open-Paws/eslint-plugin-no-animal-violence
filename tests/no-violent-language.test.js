const { RuleTester } = require("eslint");
const rule = require("../lib/rules/no-violent-language");

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2021 } });

ruleTester.run("no-speciesist-language", rule, {
	valid: [
		"const x = 1;",
		'const msg = "hello world";',
		'const msg = "normal sentence without issues";',
		'function test() { return "clean code"; }',
		"// Regular comment without problems",
		"/* multi-line comment clean */",
	],
	invalid: [
		// Test a sample of patterns from across the full list
		// Common metaphors
		{
			code: 'const msg = "kill two birds with one stone";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},
		{
			code: 'const msg = "beat a dead horse";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},
		{
			code: 'const msg = "let the cat out of the bag";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},

		// Industry euphemisms
		{
			code: 'const msg = "gestation crate";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},
		{
			code: 'const msg = "battery cage";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},
		{
			code: 'const msg = "humane slaughter";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},

		// Species-specific terms
		{
			code: 'const msg = "livestock";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},
		{
			code: 'const msg = "poultry";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},
		{
			code: 'const msg = "venison";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},

		// Animal-as-insult patterns
		{
			code: 'const msg = "code monkey";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},
		{
			code: 'const msg = "pigheaded";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},
		{
			code: 'const msg = "sheeple";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},

		// Marketing/regulatory claims
		{
			code: 'const msg = "free-range";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},
		{
			code: 'const msg = "cage-free chicken";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},
		{
			code: 'const msg = "grass-fed";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},

		// Fishing/hunting
		{
			code: 'const msg = "catch-and-release";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},
		{
			code: 'const msg = "bycatch";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},
		{
			code: 'const msg = "trophy hunting";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},

		// Broader terminology
		{
			code: 'const msg = "humans and animals";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},
		{
			code: 'const msg = "pet owner";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},
		{
			code: 'const msg = "own a pet";',
			errors: [{ messageId: "avoidViolentAnimalLanguage" }],
		},
	],
});

console.log("✓ All RuleTester tests passed");
