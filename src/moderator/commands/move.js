"use strict";

const moderator = require("../core");

function moveHalfPageUp() {
	const editor = atom.workspace.getActiveTextEditor();
	const rows = Math.ceil(editor.getRowsPerPage() / 2);
	editor.moveUp(rows);
}

function moveHalfPageDown() {
	const editor = atom.workspace.getActiveTextEditor();
	const rows = Math.ceil(editor.getRowsPerPage() / 2);
	editor.moveDown(rows);
}

function selectHalfPageUp() {
	const editor = atom.workspace.getActiveTextEditor();
	const rows = Math.ceil(editor.getRowsPerPage() / 2);
	editor.selectUp(rows);
}

function selectHalfPageDown() {
	const editor = atom.workspace.getActiveTextEditor();
	const rows = Math.ceil(editor.getRowsPerPage() / 2);
	editor.selectDown(rows);
}

atom.commands.add("atom-text-editor", "moderator:half-page-up", moveHalfPageUp);
atom.commands.add("atom-text-editor", "moderator:select-half-page-up", selectHalfPageUp);
atom.commands.add("atom-text-editor", "moderator:half-page-down", moveHalfPageDown);
atom.commands.add("atom-text-editor", "moderator:select-half-page-down", selectHalfPageDown);

atom.keymaps.add("moderator:move", moderator.buildSpecialKeymap(null, {
	"body": {
		"up": "core:move-up",
		"down": "core:move-down",
		"left": "core:move-left",
		"right": "core:move-right",
		"shift-up": "core:select-up",
		"shift-down": "core:select-down",
		"shift-left": "core:select-left",
		"shift-right": "core:select-right",
		"pageup": "core:page-up",
		"pagedown": "core:page-down",
		"shift-pageup": "core:select-page-up",
		"shift-pagedown": "core:select-page-down",
	},
	"atom-text-editor": {
		"home": "editor:move-to-first-character-of-line",
		"end": "editor:move-to-end-of-screen-line",
		"shift-home": "editor:select-to-first-character-of-line",
		"shift-end": "editor:select-to-end-of-line",
	},
}));
atom.keymaps.add("moderator:move", moderator.buildKeymap(null, {
	"body": {
		"e": "core:move-up",
		"d": "core:move-down",
		"s": "core:move-left",
		"f": "core:move-right",
		"i": "core:move-up",
		"k": "core:move-down",
		"j": "core:move-left",
		"l": "core:move-right",
		"shift-E": "core:select-up",
		"shift-D": "core:select-down",
		"shift-S": "core:select-left",
		"shift-F": "core:select-right",
		"shift-I": "core:select-up",
		"shift-K": "core:select-down",
		"shift-J": "core:select-left",
		"shift-L": "core:select-right",
	},
}));
atom.keymaps.add("moderator:move", moderator.buildKeymap("gh", {
	"body": {
		"e": "core:page-up",
		"d": "core:page-down",
		"i": "core:page-up",
		"k": "core:page-down",
		"shift-E": "core:select-page-up",
		"shift-D": "core:select-page-down",
		"shift-I": "core:select-page-up",
		"shift-K": "core:select-page-down",
	},
	"atom-text-editor": {
		"s": "editor:move-to-first-character-of-line",
		"f": "editor:move-to-end-of-screen-line",
		"j": "editor:move-to-first-character-of-line",
		"l": "editor:move-to-end-of-screen-line",
		"shift-S": "editor:select-to-first-character-of-line",
		"shift-F": "editor:select-to-end-of-line",
		"shift-J": "editor:select-to-first-character-of-line",
		"shift-L": "editor:select-to-end-of-line",
	},
}));
atom.keymaps.add("moderator:move", moderator.buildKeymap("vn", {
	"body": {
	},
	"atom-text-editor": {
		"e": "moderator:half-page-up",
		"d": "moderator:half-page-down",
		"s": "editor:move-to-beginning-of-word",
		"f": "editor:move-to-end-of-word",
		"i": "moderator:half-page-up",
		"k": "moderator:half-page-down",
		"j": "editor:move-to-beginning-of-word",
		"l": "editor:move-to-end-of-word",
		"shift-E": "moderator:select-half-page-up",
		"shift-D": "moderator:select-half-page-down",
		"shift-S": "editor:select-to-beginning-of-word",
		"shift-F": "editor:select-to-end-of-word",
		"shift-I": "moderator:select-half-page-up",
		"shift-K": "moderator:select-half-page-down",
		"shift-J": "editor:select-to-beginning-of-word",
		"shift-L": "editor:select-to-end-of-word",
	},
}));
