import { T } from "./constants.js";
import { FallingPiece } from "./FallingPiece.js";
import { Playfield } from "./Playfield.js";

let playfield = new Playfield();
let piece = new FallingPiece(T);
playfield.draw(piece);
