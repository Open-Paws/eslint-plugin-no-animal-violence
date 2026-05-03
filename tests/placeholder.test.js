const assert = require("node:assert/strict");
const { test } = require("node:test");

const plugin = require("../lib/index.js");
const rule = require("../lib/rules/no-violent-language.js");

test("plugin exports rules object", () => {
	assert.ok(plugin.rules, "plugin must export a rules object");
});

test("plugin exports no-speciesist-language rule", () => {
	assert.ok(plugin.rules["no-speciesist-language"], "plugin must export the no-speciesist-language rule");
});

test("plugin exports recommended config", () => {
	assert.ok(plugin.configs, "plugin must export a configs object");
	assert.ok(plugin.configs.recommended, "plugin must export a recommended config");
});

test("rule has required meta structure", () => {
	assert.ok(rule.meta, "rule must have a meta object");
	assert.ok(rule.meta.type, "rule meta must declare a type");
	assert.ok(rule.meta.docs, "rule meta must have docs");
	assert.ok(rule.meta.messages, "rule meta must declare messages");
});

test("rule exports a create function", () => {
	assert.equal(typeof rule.create, "function", "rule must export create()");
});

test("rule create returns visitor with Literal handler", () => {
	const reported = [];
	const mockContext = {
		report: (data) => reported.push(data),
		getSourceCode: () => ({
			getAllComments: () => [],
		}),
	};
	const visitor = rule.create(mockContext);
	assert.equal(typeof visitor.Literal, "function", "visitor must handle Literal nodes");
});

test("rule detects animal violence phrase in string literal", () => {
	const reported = [];
	const mockContext = {
		report: (data) => reported.push(data),
		getSourceCode: () => ({
			getAllComments: () => [],
		}),
	};
	const visitor = rule.create(mockContext);
	// Simulate a string literal node with a known speciesist phrase
	const node = {
		value: "this is a wild goose chase",
		loc: { start: { line: 1, column: 0 }, end: { line: 1, column: 26 } },
		range: [0, 26],
	};
	visitor.Literal(node);
	assert.ok(reported.length > 0, "rule must report a violation for a speciesist phrase");
});

test("rule does not report clean string literal", () => {
	const reported = [];
	const mockContext = {
		report: (data) => reported.push(data),
		getSourceCode: () => ({
			getAllComments: () => [],
		}),
	};
	const visitor = rule.create(mockContext);
	const node = {
		value: "this is clean text with no problematic phrases",
		loc: { start: { line: 1, column: 0 }, end: { line: 1, column: 47 } },
		range: [0, 47],
	};
	visitor.Literal(node);
	assert.equal(reported.length, 0, "rule must not report a violation for clean text");
});

test("recommended config uses correct plugin namespace", () => {
	const recommended = plugin.configs.recommended;
	assert.deepEqual(
		recommended.plugins,
		["no-animal-violence"],
		"recommended config must reference plugin as 'no-animal-violence' (matches npm package name and README)",
	);
	assert.equal(
		recommended.rules["no-animal-violence/no-speciesist-language"],
		"warn",
		"recommended config must enable rule under 'no-animal-violence/' prefix",
	);
	assert.equal(
		recommended.rules["speciesism/no-speciesist-language"],
		undefined,
		"recommended config must NOT reference the legacy 'speciesism/' prefix",
	);
});
