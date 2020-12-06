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

export function notImplementedFn() {
	console.error("Not implemented yet");
}

export function registerInputHandlers(
	handlers = {
		hardDrop: notImplementedFn,
		softDrop: notImplementedFn,
		moveLeft: notImplementedFn,
		moveRight: notImplementedFn,
		rotateClockwise: notImplementedFn,
		rotateCounterClockwise: notImplementedFn,
		hold: notImplementedFn,
		pause: notImplementedFn,
	},
	bindings = {
		hardDrop: ["KeyE"],
		softDrop: ["KeyD"],
		moveLeft: ["KeyS"],
		moveRight: ["KeyF"],
		rotateClockwise: ["ArrowRight"],
		rotateCounterClockwise: ["ArrowLeft"],
		hold: ["Tab"],
		pause: ["Escape"],
	}
) {
	document.addEventListener("keydown", (evt) => {
		console.log("code", evt.code);
		const action = findActionForKey(bindings, evt.code);
		if (action) {
			handlers[action]();
		} else {
			console.log("That key doesn't do anything");
		}
		evt.preventDefault();
	});
}
