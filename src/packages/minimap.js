"use strict";

const ppm = require("../ppm");
const moderator = require("../moderator/core");

ppm.activate("minimap", {
	displayPluginsControls: false,
});
ppm.activate("minimap-selection", {
	highlightCursorsLines: true,
	outlineSelection: true,
});
ppm.activate("minimap-find-and-replace");
ppm.activate("minimap-git-diff");
ppm.activate("minimap-highlight-selected");
