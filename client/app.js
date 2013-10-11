function App() {
	// default settings
	this.cellSize = 16;
	this.canvasWidth = 256;
	this.canvasHeight = 256;
	this.backgroundColor = '#000';
	this.color = '#789';
	this.gameRun = false;
	this.gamePause = false;
	this.apple = {x: -1, y: -1};
	
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
	
	// show
	this.updateScene();
	this.showMsg('Znake!', 'Press space to play');
}

App.prototype.updateScene = function() {
	// clear scene
	this.context.fillStyle = this.backgroundColor;
	this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

	// snake
	for (var i = this.snake.getSize() - 1; i != -1; i--) {
		if (i == 0) {
			this.context.fillStyle = '#aa0000';
		} else {
			this.context.fillStyle = this.color;
		}
		this.context.fillRect(this.snake.body[i].x * this.cellSize + 1, this.snake.body[i].y * this.cellSize + 1, this.cellSize - 2, this.cellSize - 2);
	}
	
	// apple
	if (this.snake.apple.x != -1 && this.snake.apple.y != -1) {
		this.context.beginPath();
		this.context.fillStyle = '#00aa00';
		this.context.arc(this.snake.apple.x * this.cellSize + this.cellSize / 2, this.snake.apple.y * this.cellSize + this.cellSize / 2, this.cellSize / 2 - 2, 0, Math.PI * 2);
		this.context.fill();
		this.context.closePath();
	}
}

/*

	Game message

*/

App.prototype.showMsg = function(header, action) {
	this.context.beginPath();
	this.context.fillStyle = 'rgba(0, 0, 0, 0.7)';
	this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
	this.context.closePath();
	
	this.context.beginPath();
	this.context.font = "normal normal 32px monospace";
	this.context.fillStyle = '#aa0000';
	this.context.textAlign = "center";
	this.context.fillText(header, this.canvasWidth / 2, this.canvasHeight / 2);
	this.context.closePath();
	
	this.context.beginPath();
	this.context.font = "normal normal 14px monospace";
	this.context.fillStyle = '#aa0000';
	this.context.textAlign = "center";
	this.context.fillText(action, this.canvasWidth / 2, this.canvasHeight / 2 + 32);
	this.context.closePath();
}

/*

	Game status

*/

App.prototype.isStatusOn = function() {
	return this.gameRun;
}

App.prototype.setGameOn = function() {
	this.gameRun = true;
	this.snake.createApple();
}

App.prototype.setGameOff = function(status) {
	this.gameRun = false;
	this.snake = new Snake(this);
	this.apple = {x: -1, y: -1};
	
	switch (status) {
		// game over
		case 1:
			this.showMsg('Game Over', 'Press space to play');
			break;
		
		// game win
		case 2:
			this.showMsg('You Win!', 'Press space to play');
			break;
	}
}

/*

	Pause status

*/

App.prototype.isStatusPause = function() {
	return this.gamePause;
}

App.prototype.setPauseOn = function() {
	this.gamePause = true;
	this.showMsg('Pause', 'Press space to continue');
}

App.prototype.setPauseOff = function() {
	this.gamePause = false;
}

/*

	Key's

*/

App.prototype.isKeyPause = function(event) {
	if (this.isKeySpace(event) || event.keyCode == 80) {
		return true;
	}
	return false;
}

App.prototype.isKeyUp = function(event) {
	if (event.keyCode == 87 || event.keyCode == 38) {
		return true;
	}
	return false;
}

App.prototype.isKeyDown = function(event) {
	if (event.keyCode == 83 || event.keyCode == 40) {
		return true;
	}
	return false;
}

App.prototype.isKeyLeft = function(event) {
	if (event.keyCode == 65 || event.keyCode == 37) {
		return true;
	}
	return false;
}

App.prototype.isKeyRight = function(event) {
	if (event.keyCode == 68 || event.keyCode == 39) {
		return true;
	}
	return false;
}

App.prototype.isKeySpace = function(event) {
	if (event.keyCode == 32) {
		return true;
	}
	return false;
}

