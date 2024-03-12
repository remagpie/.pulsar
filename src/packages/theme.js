"use strict";

const ppm = require("../ppm");

atom.config.set("core.themes", ["peti-ui", "one-dark-syntax"]);

ppm.activate("peti-ui", {
	compactView: true,
	hideProjectTab: true,
	fontFamily: "Pretendard Variable",
});
// apm.activate("monokai-remagpie");
ppm.activate("file-icons");
