import { T, L } from "./constants.js";
import { FallingPiece } from "./FallingPiece.js";
import { Playfield } from "./Playfield.js";

let playfield = new Playfield();
let piece = new FallingPiece(L);
const intervalId = setInterval(() => {
	const rv = piece.fall(playfield.isSpotAvailable);
	playfield.draw(piece);
	if (!rv) clearInterval(intervalId);
}, 100);
playfield.draw(piece);
