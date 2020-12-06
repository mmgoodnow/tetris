import { ALL_COLORS } from "./constants.js";
import RotationData from "./RotationData.js";

const createGetAbsoluteTileCoordinates = ([rootColumn, rootRow]) => ([
	tileXOffset,
	tileYOffset,
]) => {
	return [rootColumn + tileXOffset, rootRow + tileYOffset];
};

export class FallingPiece {
	constructor(type) {
		this.type = type;
		this.column = 4;
		this.row = 20;
	}

	getTileLocationsAtPosition([col, row]) {
		const { tiles } = RotationData[this.type];
		return tiles.map(createGetAbsoluteTileCoordinates([col, row]));
	}

	getTileLocationsAtCurrentPosition() {
		return this.getTileLocationsAtPosition([this.column, this.row]);
	}

	getColor() {
		return ALL_COLORS[this.type];
	}

	fall(validate) {
		const allTilePositions = this.getTileLocationsAtPosition([
			this.column,
			this.row - 1,
		]);
		console.log("validation", allTilePositions.every(validate));
		if (allTilePositions.every(validate)) {
			this.row--;
			return true;
		} else {
			console.log("failed to fall");
			return false;
		}
	}

	rotate(validate) {
		const [tiles, offsets] = RotationData[this.type];
	}
}
