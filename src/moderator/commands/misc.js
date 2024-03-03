"use strict";

const moderator = require("../core");

atom.keymaps.add("moderator:pane", moderator.buildKeymap(null, {
	"body": {
		"c": "pane:show-previous-item",
		"m": "pane:show-next-item",
		"shift-C": "pane:move-item-left",
		"shift-M": "pane:move-item-right",
	}
}));
atom.keymaps.add("moderator:misc", moderator.buildKeymap(null, {
	"body": {
		"p": "core:save",
		"-": "core:close",
		"_": "pane:reopen-closed-item",
		"=": "application:new-file",
		"+": "application:new-window",
	},
}));
