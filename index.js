import { T, L } from "./constants.js";
import { FallingPiece } from "./FallingPiece.js";
import { Playfield } from "./Playfield.js";

let playfield = new Playfield();
let piece = new FallingPiece(L);
while (true) {
	const rv = piece.fall(playfield.isSpotAvailable);
	console.log(piece.getTileLocationsAtCurrentPosition());
	if (!rv) break;
}
playfield.draw(piece);
console.log(playfield.data);
console.log(playfield.isSpotAvailable([9, 4]));
console.log(playfield.isSpotAvailable([10, 4]));
console.log(playfield.isSpotAvailable([11, 4]));
