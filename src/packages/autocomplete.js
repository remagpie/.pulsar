"use strict";

const moderator = require("../moderator/core");
const ppm = require("../ppm");

ppm.activate("autocomplete-plus");
moderator.addModeListener((editor, mode, isActive) => {
	if (isActive && mode === "navigate") {
		atom.commands.dispatch(editor.element, "autocomplete-plus:cancel");
	}
});

atom.keymaps.add("autocomplete-plus", {
	"[moderator=edit] atom-text-editor.autocomplete-active": {
		"tab": "autocomplete-plus:confirm",
		"enter": "autocomplete-plus:confirm",
	},
	"atom-text-editor.autocomplete-active": {
		"escape": "autocomplete-plus:cancel",
	},
});
