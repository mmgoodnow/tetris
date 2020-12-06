import { ALL_COLORS, PLAYFIELD_HEIGHT, SQUARE_SIZE } from "./constants.js";

const allColorsWithNull = [...Object.values(ALL_COLORS), null];
function getRandomFill() {
	return allColorsWithNull[
		Math.floor(Math.random() * allColorsWithNull.length)
	];
}

export class Playfield {
	constructor() {
		this.isSpotAvailable = this.isSpotAvailable.bind(this);
		const columns = 10;
		const rows = 40;
		this.context = document.getElementById("playfield").getContext("2d");
		this.data = Array.from(new Array(rows), () => new Array(columns));
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 40; j++) {
				this.set([i, j], j < 10 ? getRandomFill() : null);
			}
		}
	}

	get([col, row]) {
		return this.data[col][row];
	}

	set([col, row], value) {
		this.data[row][col] = value;
	}

	isSpotAvailable([col, row]) {
		const isInBounds = col >= 0 && col < 10 && row >= 0 && row < 40;
		return isInBounds && !this.get([col, row]);
	}

	drawBlockAtCoordinates([column, row], blockColor) {
		const xCoordinate = SQUARE_SIZE * column;
		const yCoordinate = PLAYFIELD_HEIGHT - SQUARE_SIZE * row - SQUARE_SIZE;
		if (blockColor) {
			this.context.fillStyle = blockColor;
			this.context.fillRect(
				xCoordinate + 2,
				yCoordinate + 2,
				SQUARE_SIZE - 4,
				SQUARE_SIZE - 4
			);
		} else {
			this.context.clearRect(
				xCoordinate,
				yCoordinate,
				SQUARE_SIZE,
				SQUARE_SIZE
			);
		}
		this.context.strokeStyle = blockColor ? `${blockColor}80` : "gray";
		this.context.strokeRect(
			xCoordinate + 1,
			yCoordinate + 1,
			SQUARE_SIZE - 2,
			SQUARE_SIZE - 2
		);
	}

	draw(fallingPiece) {
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 20; j++) {
				const blockColor = this.get([i, j]);
				this.drawBlockAtCoordinates([i, j], blockColor);
			}
		}

		const fallingPieceTiles = fallingPiece.getTileLocationsAtCurrentPosition();
		fallingPieceTiles.forEach((tile) => {
			this.drawBlockAtCoordinates(tile, fallingPiece.getColor());
		});
	}
}
