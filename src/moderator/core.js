"use strict";

const modeListeners = new Set();
function addModeListener(listener) {
	modeListeners.add(listener);
}
function removeModeListener(listener) {
	modeListeners.delete(listener);
}

function setMode(mode) {
	// Assign attribute
	document.documentElement.setAttribute("moderator", mode);

	// Setup the new mode's setttings
	const activeEditor = atom.workspace.getActiveTextEditor();
	for (const editor of atom.workspace.getTextEditors()) {
		for (const listener of modeListeners) {
			listener(editor, mode, editor === activeEditor);
		}
	}
}

function setModifier(id) {
	document.documentElement.setAttribute("modifier", id);
}

// Translate the modifiers of the key sequences
function translate(keys) {
	let result = keys;
	// Replace the modifiers with the placeholders
	result = result.replace("ctrl", "!CTRL!");
	result = result.replace("alt", "!ALT!");

	// Derive the modifier keys for this platform
	let ctrl, alt;
	switch (process.platform) {
		case "darwin": {
			ctrl = "cmd";
			alt = "ctrl";
			break;
		}
		default: {
			ctrl = "ctrl";
			alt = "alt";
			break;
		}
	}

	// Fill in the placeholders
	result = result.replace("!CTRL!", ctrl);
	result = result.replace("!ALT!", alt);

	return result;
}

function buildKeymapImpl(modifier, ignoreMode, keymap) {
	let modeSelector = "";
	if (!ignoreMode) {
		modeSelector = "[moderator=navigate]";
	}
	let modifierSelector = "";
	if (modifier != null) {
		modifierSelector = `[modifier=${modifier}]`;
	}

	const result = {};
	for (const [selector, submap] of Object.entries(keymap)) {
		const selectorWithMode = `${modeSelector}${modifierSelector} ${selector}`.trim();
		const selectorWithModifier = `${modifierSelector} ${selector}`.trim();

		result[selectorWithMode] = {};
		result[selectorWithModifier] = {};
		for (const [stroke, command] of Object.entries(submap)) {
			const keys = stroke.split(/\s+/);
			const firstKey = keys[0];
			const otherKeys = keys.slice(1);

			let combinations = [""]
			for (const k of otherKeys) {
				if (k.startsWith("^")) {
					continue;
				}
				combinations = combinations.flatMap((c) => [c + " " + k, c + " " + "ctrl-" + k]);
			}
			for (const c of combinations) {
				const withCtrl = translate("ctrl-" + firstKey + " " + c).trim();
				const withoutCtrl = translate(firstKey + " " + c).trim();

				result[selectorWithMode][withoutCtrl] = command;
				result[selectorWithModifier][withCtrl] = command;
			}
		}
	}

	return result;
}

// Create key bindings for all combinations with and without ctrl
function buildKeymap(modifier, keymap) {
	return buildKeymapImpl(modifier, false, keymap);
}
function buildSpecialKeymap(modifier, keymap) {
	return buildKeymapImpl(modifier, true, keymap);
}

module.exports = {
	addModeListener,
	buildKeymap,
	buildSpecialKeymap,
	removeModeListener,
	setMode,
	setModifier,
	translate,
};
