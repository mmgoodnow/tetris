import { ALL_COLORS, PLAYFIELD_HEIGHT, SQUARE_SIZE } from "./constants.js";

const allColorsWithNull = [...Object.values(ALL_COLORS), null];
function getRandomFill() {
	return allColorsWithNull[
		Math.floor(Math.random() * allColorsWithNull.length)
	];
}

export class Playfield {
	constructor() {
		const columns = 10;
		const rows = 40;
		this.context = document.getElementById("playfield").getContext("2d");
		this.data = Array.from(new Array(columns), () => new Array(rows));
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				this.data[i][j] = getRandomFill();
			}
		}
	}

	get(x, y) {
		return this.data[x][y];
	}

	drawBlockAtCoordinates(x, y, blockColor) {
		const xCoordinate = SQUARE_SIZE * x;
		const yCoordinate = PLAYFIELD_HEIGHT - SQUARE_SIZE * y - SQUARE_SIZE;
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
				const blockColor = this.get(i, j);
				this.drawBlockAtCoordinates(i, j, blockColor);
			}
		}
	}
}
