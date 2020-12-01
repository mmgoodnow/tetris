const SQUARE_SIZE = 100;
const PLAYFIELD_WIDTH = 1000;
const PLAYFIELD_HEIGHT = 2000;

const GREEN = "green"; // S
const RED = "red"; // Z
const BLUE = "blue"; // J
const LIGHT_BLUE = "light blue"; // I
const PURPLE = "purple"; // T
const ORANGE = "orange"; // L
const YELLOW = "yellow"; // O
const ALL_COLORS = [GREEN, RED, BLUE, LIGHT_BLUE, PURPLE, ORANGE, YELLOW, null];

class Playfield {
	constructor() {
		const columns = 10;
		const rows = 40;
		this._data = Array.from(new Array(columns), () => new Array(rows));
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				this._data[i][j] =
					ALL_COLORS[Math.floor(Math.random() * ALL_COLORS.length)];
			}
		}
	}

	get(x, y) {
		return this._data[x][y];
	}

	drawBlockAtCoordinates(x, y, blockColor) {
		const context = this.getContext();
		const xCoordinate = SQUARE_SIZE * x;
		const yCoordinate = PLAYFIELD_HEIGHT - SQUARE_SIZE * y - SQUARE_SIZE;
		if (blockColor) {
			context.fillStyle = blockColor;
			context.fillRect(
				xCoordinate,
				yCoordinate,
				SQUARE_SIZE,
				SQUARE_SIZE
			);
		} else {
			context.clearRect(
				xCoordinate,
				yCoordinate,
				SQUARE_SIZE,
				SQUARE_SIZE
			);
		}
		context.strokeRect(xCoordinate, yCoordinate, SQUARE_SIZE, SQUARE_SIZE);
	}

	draw() {
		const context = this.getContext();
		context.strokeStyle = "rgba(255, 255, 255, 0.5)";
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 20; j++) {
				const blockColor = this.get(i, j);
				this.drawBlockAtCoordinates(i, j, blockColor);
			}
		}
	}

	getContext() {
		const canvas = document.getElementById("playfield");
		return canvas.getContext("2d");
	}
}

let playfield = new Playfield();
playfield.draw();
