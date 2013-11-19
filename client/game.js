function Game() {
	// default settings
	this.cellSize = 16;
	this.canvasWidth = 256;
	this.canvasHeight = 256;
	this.backgroundColor = '#000';
	this.color = '#789';
	this.score = 0;
	this.status = 1;
	this.STATUS = {
			PLAY: 0,
			NONE: 1,
			GAMEOVER: 2,
			GAMEWIN: 3,
			PAUSE: 4
		};
	
	// centring
	document.getElementById('main').style.textAlign = 'center';

	// configuring canvas
	this.canvas = document.getElementById('canvas');

	this.canvas.width = this.canvasWidth;
	this.canvas.height = this.canvasHeight;
	this.canvas.style.border = '1px solid #444';

	// context
	this.context = canvas.getContext('2d');
	
	// scene
	this.sceneWidth = Math.ceil(this.canvasWidth / this.cellSize);
	this.sceneHeight = Math.ceil(this.canvasHeight / this.cellSize);

	// load snake
	this.snake = new Snake(this);
	
	// load apple
	this.apple = new Apple(this);
}

Game.prototype.init = function() {
	this.reset();
}

Game.prototype.update = function() {
	if (this.getStatus() == 0) {
		this.snake.update();
	}
	input.isLock = false;
}

Game.prototype.reset = function() {
	this.snake = new Snake(this);
	this.apple = new Apple(this);

	// zeroing variables
	this.score = 0;
}

Game.prototype.render = function() {
	// clear scene
	this.context.fillStyle = this.backgroundColor;
	this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

	// render dynamic
	this.snake.render();
	this.apple.render();

	switch (this.getStatus()) {
		// playing
		case this.STATUS.PLAY:
			break;

		// none
		case this.STATUS.NONE:
			this.showMsg('Znake!', 'Press space to play');
			break;

		// game over
		case this.STATUS.GAMEOVER:
			this.showMsg('Game Over', 'Press space to play', 'Score: ' + this.score);
			break;
		
		// game win
		case this.STATUS.GAMEWIN:
			this.showMsg('You Win!', 'Press space to play', 'Score: ' + this.score);
			break;

		// pause
		case this.STATUS.PAUSE:
			this.showMsg('Pause', 'Press space to continue');
			break;
	}
}

/*

	Game message

*/

Game.prototype.showMsg = function(header, action, addition) {
	// background
	this.context.beginPath();
	this.context.fillStyle = 'rgba(0, 0, 0, 0.7)';
	this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
	this.context.closePath();

	// top text
	this.context.beginPath();
	this.context.font = "normal normal 32px monospace";
	this.context.fillStyle = '#aa0000';
	this.context.textAlign = "center";
	this.context.fillText(header, this.canvasWidth / 2, this.canvasHeight / 2);
	this.context.closePath();

	// middle text
	this.context.beginPath();
	this.context.font = "normal normal 14px monospace";
	this.context.fillStyle = '#aa0000';
	this.context.textAlign = "center";
	this.context.fillText(action, this.canvasWidth / 2, this.canvasHeight / 2 + 32);
	this.context.closePath();

	// bottom addition text
	if (addition !== undefined) {
		this.context.beginPath();
		this.context.font = "normal normal 14px monospace";
		this.context.fillStyle = '#aa0000';
		this.context.textAlign = "center";
		this.context.fillText(addition, this.canvasWidth / 2, this.canvasHeight - 32);
		this.context.closePath();
	}
}

/*

	Game status

*/

Game.prototype.setStatus = function(value) {
	this.onStatusChange(value, this.status);
	this.status = value;
}

Game.prototype.getStatus = function() {
	return this.status;
}

Game.prototype.onStatusChange = function(newstatus, oldstatus) {
	if (newstatus == this.STATUS.PLAY && oldstatus != this.STATUS.PAUSE) {
		this.apple.create();
	}
}

/*

	Key's

*/

Game.prototype.handleInput = function(event) {
	if (input.isKey('SPACE')) {
		if (this.getStatus() == this.STATUS.GAMEOVER || this.getStatus() == this.STATUS.GAMEWIN) {
			this.reset();
			this.setStatus(this.STATUS.PLAY);
		} else if (this.getStatus() == this.STATUS.PAUSE) {
			this.setStatus(this.STATUS.PLAY);
		} else if (this.getStatus() == this.STATUS.PLAY) {
			this.setStatus(this.STATUS.PAUSE);
		} else if (this.getStatus() == this.STATUS.NONE) {
			this.setStatus(this.STATUS.PLAY);
		}
	}

	if (this.getStatus() == this.STATUS.PLAY && !input.isLock) {
		input.isLock = true;

		if ((input.isKey('UP') || input.isKey('w')) && !this.snake.isRoute('DOWN')) {
			this.snake.setRoute('UP');
		} else if ((input.isKey('DOWN') || input.isKey('s')) && !this.snake.isRoute('UP')) {
			this.snake.setRoute('DOWN');
		} else if ((input.isKey('LEFT') || input.isKey('a')) && !this.snake.isRoute('RIGHT')) {
			this.snake.setRoute('LEFT');
		} else if ((input.isKey('RIGHT') || input.isKey('d')) && !this.snake.isRoute('LEFT')) {
			this.snake.setRoute('RIGHT');
		}
	}
}
