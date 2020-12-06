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
		this.col = 4;
		this.row = 20;
		this.direction = 0;
	}

	getTileLocationsAtPosition([col, row]) {
		const { tiles } = RotationData[this.type];
		return tiles.map(createGetAbsoluteTileCoordinates([col, row]));
	}

	getTileLocationsAtCurrentPosition() {
		return this.getTileLocationsAtPosition([this.col, this.row]);
	}

	getColor() {
		return ALL_COLORS[this.type];
	}

	validateTilesAtPosition([col, row], validate) {
		const allTilePositions = this.getTileLocationsAtPosition([col, row]);
		return allTilePositions.every(validate);
	}

	fall(validate) {
		if (this.validateTilesAtPosition([this.col, this.row - 1], validate)) {
			this.row--;
			return true;
		}
		return false;
	}

	moveLeft(validate) {
		if (this.validateTilesAtPosition([this.col - 1, this.row], validate)) {
			this.col--;
			return true;
		}
		return false;
	}

	moveRight(validate) {
		if (this.validateTilesAtPosition([this.col + 1, this.row], validate)) {
			this.col++;
			return true;
		}
		return false;
	}

	rotate(validate) {
		const [tiles, offsets] = RotationData[this.type];
	}
}
