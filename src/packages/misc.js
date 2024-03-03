"use strict";

const ppm = require("../ppm");
const moderator = require("../moderator/core");

ppm.activate("bracket-matcher", {
	alwaysSkipClosingPairs: true,
});
ppm.activate("find-and-replace");
ppm.activate("github");
ppm.activate("go-to-line");
ppm.activate("highlight-selected");
ppm.activate("markdown-preview");
ppm.activate("tabs", {
	tabScrolling: false,
	enableVcsColoring: true,
	enableMruTabSwitching: false,
	displayMruTabList: false,
});
ppm.activate("tree-view", {
	alwaysOpenExisting: true,
});
ppm.activate("whitespace");

atom.keymaps.add("find-and-replace", moderator.buildKeymap(null, {
	".find-and-replace":  {
		"shift-enter": "find-and-replace:show-previous",
		"tab": "find-and-replace:focus-next",
		"shift-tab": "find-and-replace:focus-previous",
	},
	".project-find": {
		"tab": "find-and-replace:focus-next",
		"shift-tab": "find-and-replace:focus-previous",
	}
}));
atom.keymaps.add("find-and-replace", moderator.buildKeymap(null, {
	"body": {
		"q": "find-and-replace:show",
		'shift-Q': "project-find:show",
	},
// '.platform-win32 atom-text-editor, .platform-linux atom-text-editor':
//   'f3': 'find-and-replace:find-next'
//   'shift-f3': 'find-and-replace:find-previous'
//   'ctrl-d': 'find-and-replace:select-next'
//
// '.platform-win32 .find-and-replace, .platform-linux .find-and-replace':
//   'ctrl-alt-/': 'find-and-replace:toggle-regex-option'
//   'ctrl-shift-c': 'find-and-replace:toggle-case-option'
//
// '.platform-win32 .project-find, .platform-linux .project-find':
//   'ctrl-alt-/': 'project-find:toggle-regex-option'
//   'ctrl-shift-c': 'project-find:toggle-case-option'
//
// '.platform-linux .find-and-replace .replace-container atom-text-editor':
//   'ctrl-enter': 'find-and-replace:replace-all'
// '.platform-linux .project-find .replace-container atom-text-editor':
//   'ctrl-enter': 'project-find:replace-all'
}));
atom.keymaps.add("tree-view", moderator.buildKeymap(null, {
	"body": {
		"\\": "tree-view:toggle",
	},
}));
atom.keymaps.add("tree-view", {
	".tree-view": {
		"up": "core:move-up",
		"down": "core:move-down",
		"left": "tree-view:collapse-directory",
		"right": "tree-view:expand-item",
		"e": "core:move-up",
		"d": "core:move-down",
		"s": "tree-view:collapse-directory",
		"f": "tree-view:expand-item",
		"i": "core:move-up",
		"k": "core:move-down",
		"j": "tree-view:collapse-directory",
		"l": "tree-view:expand-item",
		"t": "tree-view:copy",
		"shift-T": "tree-view:cut",
		"y": "tree-view:paste",
	},
// '.platform-win32, .platform-linux':
//   'alt-\\': 'tree-view:toggle-focus'
//
// '.tree-view':
//   'alt-right': 'tree-view:recursive-expand-directory'
//   'alt-left': 'tree-view:recursive-collapse-directory'
//   'enter': 'tree-view:open-selected-entry'
//   'escape': 'tree-view:unfocus'
//   'm': 'tree-view:move'
//   'a': 'tree-view:add-file'
//   'shift-a': 'tree-view:add-folder'
//   'delete': 'tree-view:remove'
//   'backspace': 'tree-view:remove'
//   'home': 'core:move-to-top'
//   'end': 'core:move-to-bottom'
});
