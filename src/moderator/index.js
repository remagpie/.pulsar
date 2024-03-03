"use strict";

const moderator = require("./core");

// Disable all keymaps
for (const p of atom.packages.getLoadedPackages()) {
	p.deactivateKeymaps();
}
const defaultBindings = atom.keymaps.keyBindings;
atom.keymaps.keyBindings = [];

// Restore default key bindings not related to this setting
atom.keymaps.add("core:base.cson", {
	".tool-panel.panel-left, .tool-panel.panel-right": {
		"escape": "tool-panel:unfocus",
	},
	"body": {
		"enter": "core:confirm",
		"escape": "core:cancel",
	},
});

// Add mode change commands
atom.commands.add("atom-text-editor", "moderator:switch-to-navigate-mode", () => {
	moderator.setMode("navigate");
});
atom.commands.add("atom-text-editor", "moderator:switch-to-edit-mode", () => {
	moderator.setMode("edit");
});

// Add modifier commands
atom.commands.add("atom-text-editor", "moderator:reset-modifier", () => {
	moderator.setModifier("");
});
atom.commands.add("atom-text-editor", "moderator:set-modifier-gh", () => {
	moderator.setModifier("gh");
});
atom.commands.add("atom-text-editor", "moderator:set-modifier-vn", () => {
	moderator.setModifier("vn");
});

// Add mode keymaps
atom.keymaps.add("moderator:core", {
	"[moderator=navigate]": {
		[moderator.translate("space")]: "moderator:switch-to-edit-mode",
	},
	// TODO: remove atom-text-editor
	"[moderator=edit] atom-text-editor": {
		[moderator.translate("ctrl-space")]: "moderator:switch-to-navigate-mode",
	},
});

// Add modifier keymaps
atom.keymaps.add("moderator:modifier", {
	"[moderator=navigate][modifier='']": {
		"g": "moderator:set-modifier-gh",
		"shift-G": "moderator:set-modifier-gh",
		"h": "moderator:set-modifier-gh",
		"shift-H": "moderator:set-modifier-gh",
		"v": "moderator:set-modifier-vn",
		"shift-V": "moderator:set-modifier-vn",
		"n": "moderator:set-modifier-vn",
		"shift-N": "moderator:set-modifier-vn",
	},
	"[modifier='']": {
		[moderator.translate("ctrl-g")]: "moderator:set-modifier-gh",
		[moderator.translate("ctrl-shift-G")]: "moderator:set-modifier-gh",
		[moderator.translate("ctrl-h")]: "moderator:set-modifier-gh",
		[moderator.translate("ctrl-shift-H")]: "moderator:set-modifier-gh",
		[moderator.translate("ctrl-v")]: "moderator:set-modifier-vn",
		[moderator.translate("ctrl-shift-V")]: "moderator:set-modifier-vn",
		[moderator.translate("ctrl-n")]: "moderator:set-modifier-vn",
		[moderator.translate("ctrl-shift-N")]: "moderator:set-modifier-vn",
	},
	"[modifier='gh']": {
		"^g": "moderator:reset-modifier",
		"^h": "moderator:reset-modifier",
	},
	"[modifier='vn']": {
		"^v": "moderator:reset-modifier",
		"^n": "moderator:reset-modifier",
	},
});

require("./commands/edit");
require("./commands/misc");
require("./commands/move");

// Toggle input depending on the current mode
atom.workspace.observeTextEditors((editor) => {
	const mode = document.documentElement.getAttribute("moderator");
	editor.enableKeyboardInput(mode === "edit");
});

moderator.addModeListener((editor, mode) => {
	editor.enableKeyboardInput(mode === "edit");
});
moderator.addModeListener((editor, mode, isActive) => {
	if (isActive && mode === "navigate") {
		atom.commands.dispatch(editor.element, "autocomplete-plus:cancel");
	}
});

// Set the initial mode to navigate mode
moderator.setMode("navigate");
moderator.setModifier("");
