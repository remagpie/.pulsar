"use strict";

const { BufferedProcess } = require("atom");
const fs = require("fs").promises;
const path = require("path");

function isObject(val) {
	return (typeof val === "object") && val !== null;
}

// Execute ppm command. Turns off the color by default.
async function ppm(...args) {
	return await new Promise((resolve, reject) => {
		let output = "";
		let error = "";
		new BufferedProcess({
			command: atom.packages.getApmPath(),
			args: ["--no-color", ...args],
			stdout: (o) => { output += o },
			stderr: (e) => { error += e },
			exit: (code) => {
				if (code === 0) {
					resolve(output);
				} else {
					reject(error);
				}
			},
		});
	});
}

const installing = new Map();
async function install(name, parents = ["User config"]) {
	// Just enable the package if it's already installed
	if (atom.packages.getAvailablePackageNames().includes(name)) {
		atom.packages.enablePackage(name);
		return;
	}

	// Return immediately if it's already installing
	if (installing.has(name)) {
		return;
	}

	installing.set(name, ppm("install", name, "--color"));
	const notification = atom.notifications.addInfo(`Installing "${name}"`, {
		detail: `Required by ${parents.join(" > ")}`,
		dismissable: true,
	});
	try {
		await installing.get(name);
	} catch (e) {
		atom.notifications.addError(`Failed to install "${name}"`, {
			detail: e,
		});
		throw e;
	} finally {
		notification.dismiss();
		installing.delete(name);
	}

	// Find the package path and load package.json
	let metadata;
	for (const dir of atom.packages.getPackageDirPaths()) {
		const packages = await fs.readdir(dir);
		if (packages.includes(name)) {
			metadata = require(path.join(dir, name, "package.json"));
			break;
		}
	}

	// Refresh theme list if the package is theme package
	if (Object.keys(metadata).includes("theme")) {
		console.log("activating");
		await atom.themes.activateThemes();
	}

	// Install the dependencies
	if (Object.keys(metadata).includes("package-deps")) {
		for (const dependency of metadata["package-deps"]) {
			await install(
				typeof dependency === "string" ? dependency : dependency.name,
				[...parents, name],
			);
		}
	}
}

function configure(key, scope, config) {
	if (isObject(config)) {
		for (const [k, v] of Object.entries(config)) {
			configure(key + "." + k, scope, v);
		}
	}
	else {
		atom.config.set(key, config, {
			scopeSelector: scope !== "*" ? scope : undefined,
		});
	}
}

async function activate(name, config) {
	await install(name);
	configure(name, "*", config);
}

exports.activate = activate;
exports.configure = configure;
exports.install = install;
