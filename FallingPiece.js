import RotationData from "./RotationData.json";

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

	getTileLocationsAtPosition([column, row]) {
		const { tiles } = RotationData[this.type];
		return tiles.map(
			createGetAbsoluteTileCoordinates([this.column, this.row])
		);
	}

	getTileLocationsAtCurrentPosition() {
		return this.getTileLocationsAtPosition([this.column, this.row]);
	}

	fall(validate) {
		const allTilePositions = this.getTileLocationsAtPosition([
			this.column,
			this.row - 1,
		]);
		console.log("all tile positions", allTilePositions);
		if (allTilePositions.every(validate)) {
			this.row--;
		} else {
			console.log("failed to fall");
		}
	}

	rotate(validate) {
		const [tiles, offsets] = RotationData[this.type];
	}
}
