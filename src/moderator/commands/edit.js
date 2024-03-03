"use strict";

const moderator = require("../core");

atom.keymaps.add("moderator:edit", moderator.buildSpecialKeymap(null, {
	"body": {
		"backspace": "core:backspace",
		"delete": "core:delete",
		"shift-backspace": "core:backspace",
		"shift-delete": "core:delete",
	},
	"atom-text-editor:not([mini])": {
		"enter": "editor:newline",
		"tab": "editor:indent",
		"shift-tab": "editor:outdent-selected-rows",
	},
}));
atom.keymaps.add("moderator:edit", moderator.buildKeymap(null, {
	"body": {
		"w": "core:backspace",
		"shift-W": "core:backspace",
		"o": "core:delete",
		"shift-O": "core:delete",
		"u": "core:undo",
		"r": "core:redo",
		"t": "core:copy",
		"shift-T": "core:cut",
		"y": "core:paste",
	},
	"atom-text-editor:not([mini])": {
		"/": "editor:toggle-line-comments",
	},
}));
atom.keymaps.add("moderator:edit", moderator.buildKeymap("gh", {
	"atom-text-editor": {
		"w": "editor:delete-line",
		"o": "editor:delete-line",
	},
}));
atom.keymaps.add("moderator:edit", moderator.buildKeymap("vn", {
	"atom-text-editor": {
		"w": "editor:delete-to-beginning-of-word",
		"o": "editor:delete-to-end-of-word",
	},
}));
