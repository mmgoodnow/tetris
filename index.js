import { T, L } from "./constants.js";
import { FallingPiece } from "./FallingPiece.js";
import { registerInputHandlers, notImplementedFn } from "./InputController.js";
import { Playfield } from "./Playfield.js";

let playfield = new Playfield();
let piece = new FallingPiece(L);

const intervalId1 = setInterval(() => {
	const rv = piece.fall(playfield.isSpotAvailable);
	if (!rv) clearInterval(intervalId1);
}, 1000);

const intervalId2 = setInterval(() => {
	playfield.draw(piece);
}, 10);

registerInputHandlers({
	hardDrop: notImplementedFn,
	softDrop: notImplementedFn,
	moveLeft: () => piece.moveLeft(playfield.isSpotAvailable),
	moveRight: () => piece.moveRight(playfield.isSpotAvailable),
	hold: notImplementedFn,
	pause: notImplementedFn,
	rotateClockwise: notImplementedFn,
	rotateCounterClockwise: notImplementedFn,
});
