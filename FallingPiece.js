import { ALL_COLORS, LEFT, RIGHT } from "./constants.js";
import RotationData from "./RotationData.js";

const toAbsoluteCoordinates = ([rootColumn, rootRow]) => ([
	tileXOffset,
	tileYOffset,
]) => {
	return [rootColumn + tileXOffset, rootRow + tileYOffset];
};

const rotateTileAroundOrigin = (rotation) => ([x, y]) => {
	switch (rotation) {
		case 0:
			return [x, y];
		case 1:
			return [y, -x];
		case 2:
			return [-x, -y];
		case 3:
			return [-y, x];
		default:
			throw new Error("Reached bottom of rotation switch");
	}
};

export class FallingPiece {
	constructor(type, validator) {
		this.type = type;
		this.col = 4;
		this.row = 20;
		this.rotation = 0;
		this.validate = validator;
	}

	/**
	 * Given absolute root coordinates, get the absolute coordinates of all tiles.
	 * @param col
	 * @param row
	 * @param rotation
	 * @returns {*[]}
	 */
	getTileLocationsAtPosition([col, row], rotation) {
		const { tiles } = RotationData[this.type];
		return tiles
			.map(rotateTileAroundOrigin(rotation))
			.map(toAbsoluteCoordinates([col, row]));
	}

	getTileLocationsAtCurrentPosition() {
		return this.getTileLocationsAtPosition(
			[this.col, this.row],
			this.rotation
		);
	}

	getColor() {
		return ALL_COLORS[this.type];
	}

	validateTilesAtPosition([col, row], rotation) {
		const allTilePositions = this.getTileLocationsAtPosition(
			[col, row],
			rotation
		);
		return allTilePositions.every(this.validate);
	}

	fall() {
		if (
			this.validateTilesAtPosition(
				[this.col, this.row - 1],
				this.rotation
			)
		) {
			this.row--;
			return true;
		}
		return false;
	}

	move(direction) {
		if (
			this.validateTilesAtPosition(
				[this.col + direction, this.row],
				this.rotation
			)
		) {
			this.col += direction;
			return true;
		}
		return false;
	}

	rotate(theta) {
		const nextRotation = (this.rotation + theta + 4) % 4;
		const { offsets } = RotationData[this.type];
		const currentOffsetTable = offsets[this.rotation];
		const nextOffsetTable = offsets[nextRotation];
		const offsetDiffs = currentOffsetTable.map(([curX, curY], idx) => {
			const [nextX, nextY] = nextOffsetTable[idx];
			return [curX - nextX, curY - nextY];
		});
		const tilePositionsPreOffset = this.getTileLocationsAtPosition(
			[this.col, this.row],
			nextRotation
		);
		const offset = offsetDiffs.find(([xOffset, yOffset]) => {
			const tilePositionsPostOffset = tilePositionsPreOffset.map(
				([x, y]) => [x + xOffset, y + yOffset]
			);
			return tilePositionsPostOffset.every(this.validate);
		});
		if (!offset) {
			console.log("Rotation failed");
			return;
		}
		const [xOffset, yOffset] = offset;
		this.col += xOffset;
		this.row += yOffset;
		this.rotation = nextRotation;
	}
}
