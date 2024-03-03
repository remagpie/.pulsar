"use strict";

const ppm = require("../ppm");
const moderator  = require("../moderator/core");

ppm.activate("command-palette");
ppm.activate("fuzzy-finder", {
	scoringSystem: "alternate",
});
atom.keymaps.add("custom", moderator.buildKeymap(null, {
	"body": {
		"b": "command-palette:toggle",
	},
}));
atom.keymaps.add("custom", moderator.buildKeymap("gh", {
	"body": {
		"b": "fuzzy-finder:toggle-buffer-finder",
	},
}));
atom.keymaps.add("custom", moderator.buildKeymap("vn", {
	"body": {
		"b": "fuzzy-finder:toggle-file-finder",
	},
}));
