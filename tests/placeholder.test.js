const assert = require("node:assert/strict");
const { test } = require("node:test");

const plugin = require("../lib/index.js");

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
