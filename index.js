import { L, T, LEFT, RIGHT } from "./constants.js";
import { FallingPiece } from "./FallingPiece.js";
import { notImplementedFn, registerInputHandlers } from "./InputController.js";
import { Playfield } from "./Playfield.js";

let playfield = new Playfield();
let piece = new FallingPiece(T, playfield.isSpotAvailable);

const intervalId1 = setInterval(() => {
	const rv = piece.fall();
	if (!rv) clearInterval(intervalId1);
}, 1000);

const intervalId2 = setInterval(() => {
	playfield.draw(piece);
}, 10);

registerInputHandlers({
	hardDrop: notImplementedFn,
	softDrop: notImplementedFn,
	moveLeft: () => piece.move(LEFT),
	moveRight: () => piece.move(RIGHT),
	hold: notImplementedFn,
	pause: notImplementedFn,
	rotateRight: () => piece.rotate(RIGHT),
	rotateLeft: () => piece.rotate(LEFT),
});
