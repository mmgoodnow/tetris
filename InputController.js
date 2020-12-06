const ALL_ACTIONS = {
	hardDrop: "hardDrop",
	softDrop: "softDrop",
	rotateLeft: "rotateLeft",
	rotateRight: "rotateRight",
	moveLeft: "moveLeft",
	moveRight: "moveRight",
	hold: "hold",
	pause: "pause",
};

function findActionForKey(bindings, keycode) {
	return Object.keys(bindings).find((action) =>
		bindings[action].includes(keycode)
	);
}

function notImplementedFn() {
	console.error("Not implemented yet");
}

function registerInputHandlers({
	handlers = {
		hardDrop: notImplementedFn,
		softDrop: notImplementedFn,
		moveLeft: notImplementedFn,
		moveRight: notImplementedFn,
		hold: notImplementedFn,
		pause: notImplementedFn,
		rotateClockwise: notImplementedFn,
		rotateCounterClockwise: notImplementedFn,
	},
	bindings = {
		hardDrop: ["KeyE"],
		softDrop: ["KeyD"],
		moveLeft: ["KeyS"],
		moveRight: ["KeyF"],
		hold: ["Space"],
		pause: ["KeyR"],
		rotateClockwise: ["KeyP"],
		rotateCounterClockwise: ["KeyJ"],
	},
}) {
	document.addEventListener("keydown", (evt) => {
		console.log("code", evt.code);
		const action = findActionForKey(bindings, evt.code);
		handlers[action]();
		evt.preventDefault();
	});
}
