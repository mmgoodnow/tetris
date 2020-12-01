const SQUARE_SIZE = 100;
const PLAYFIELD_WIDTH = 1000;
const PLAYFIELD_HEIGHT = 2000;

const GREEN = "#008000";
const RED = "#ff0000";
const BLUE = "#0000ff";
const LIGHT_BLUE = "#00ffff";
const PURPLE = "#800080";
const ORANGE = "#ffa500";
const YELLOW = "#ffff00";
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
				xCoordinate + 2,
				yCoordinate + 2,
				SQUARE_SIZE - 4,
				SQUARE_SIZE - 4
			);
		} else {
			context.clearRect(
				xCoordinate,
				yCoordinate,
				SQUARE_SIZE,
				SQUARE_SIZE
			);
		}
		context.strokeStyle = blockColor ? `${blockColor}80` : 'gray';
		context.strokeRect(
			xCoordinate + 1,
			yCoordinate + 1,
			SQUARE_SIZE - 2,
			SQUARE_SIZE - 2
		);
	}

	draw() {
		const context = this.getContext();
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
