function App() {
	// default settings
	this.cellSize = 16;
	this.canvasWidth = 256;
	this.canvasHeight = 256;
	this.color = '#789';
	this.gameRun = false;
	this.gamePause = false;
	this.apple = {x: -1, y: -1};
	
	// create canvas
	$('#main').css('text-align', 'center');
	
	$('<canvas>').attr({
		id: 'canvas',
		width: this.canvasWidth,
		height: this.canvasHeight
	}).css({
		border: '1px solid #444'
	}).appendTo('#main');
	
	this.canvas = document.getElementById('canvas');
	this.context = canvas.getContext('2d');
	
	this.sceneWidth = Math.ceil(this.canvasWidth / this.cellSize);
	this.sceneHeight = Math.ceil(this.canvasHeight / this.cellSize);
	
	// load snake
	this.snake = new Snake(this);
	
	// show
	this.updateScene();
	this.showStartMsg();
}

App.prototype.updateScene = function() {
	// clear scene
	this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	
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

App.prototype.showGameOverMsg = function() {
	this.context.beginPath();
	this.context.fillStyle = 'rgba(0, 0, 0, 0.7)';
	this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
	this.context.closePath();
	
	this.context.beginPath();
	this.context.font = "normal normal 32px monospace";
	this.context.fillStyle = '#aa0000';
	this.context.textAlign = "center";
	this.context.fillText("Game Over", this.canvasWidth / 2, this.canvasHeight / 2);
	this.context.closePath();
	
	this.context.beginPath();
	this.context.font = "normal normal 14px monospace";
	this.context.fillStyle = '#aa0000';
	this.context.textAlign = "center";
	this.context.fillText("Press space to play", this.canvasWidth / 2, this.canvasHeight / 2 + 32);
	this.context.closePath();
}

App.prototype.showGameWinMsg = function() {
	this.context.beginPath();
	this.context.fillStyle = 'rgba(0, 0, 0, 0.7)';
	this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
	this.context.closePath();
	
	this.context.beginPath();
	this.context.font = "normal normal 32px monospace";
	this.context.fillStyle = '#aa0000';
	this.context.textAlign = "center";
	this.context.fillText("You Win!", this.canvasWidth / 2, this.canvasHeight / 2);
	this.context.closePath();
	
	this.context.beginPath();
	this.context.font = "normal normal 14px monospace";
	this.context.fillStyle = '#aa0000';
	this.context.textAlign = "center";
	this.context.fillText("Press space to play", this.canvasWidth / 2, this.canvasHeight / 2 + 32);
	this.context.closePath();
}

App.prototype.showGamePauseMsg = function() {
	this.context.beginPath();
	this.context.fillStyle = 'rgba(0, 0, 0, 0.7)';
	this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
	this.context.closePath();
	
	this.context.beginPath();
	this.context.font = "normal normal 32px monospace";
	this.context.fillStyle = '#aa0000';
	this.context.textAlign = "center";
	this.context.fillText("Pause", this.canvasWidth / 2, this.canvasHeight / 2);
	this.context.closePath();
	
	this.context.beginPath();
	this.context.font = "normal normal 14px monospace";
	this.context.fillStyle = '#aa0000';
	this.context.textAlign = "center";
	this.context.fillText("Press space to continue", this.canvasWidth / 2, this.canvasHeight / 2 + 32);
	this.context.closePath();
}

App.prototype.showStartMsg = function() {
	this.context.beginPath();
	this.context.fillStyle = 'rgba(0, 0, 0, 0.7)';
	this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
	this.context.closePath();
	
	this.context.beginPath();
	this.context.font = "normal normal 32px monospace";
	this.context.fillStyle = '#aa0000';
	this.context.textAlign = "center";
	this.context.fillText("Znake!", this.canvasWidth / 2, this.canvasHeight / 2);
	this.context.closePath();
	
	this.context.beginPath();
	this.context.font = "normal normal 14px monospace";
	this.context.fillStyle = '#aa0000';
	this.context.textAlign = "center";
	this.context.fillText("Press space to play", this.canvasWidth / 2, this.canvasHeight / 2 + 32);
	this.context.closePath();
}

App.prototype.isGameStart = function() {
	return this.gameRun;
}

App.prototype.startGame = function() {
	this.gameRun = true;
	this.snake.createApple();
}

App.prototype.stopGame = function(status) {
	this.gameRun = false;
	this.snake = new Snake(this);
	this.apple = {x: -1, y: -1};
	
	switch (status) {
		// game over
		case 1:
			this.showGameOverMsg();
			break;
		
		// game win
		case 2:
			this.showGameWinMsg();
			break;
	}
}

App.prototype.isGamePause = function() {
	return this.gamePause;
}

App.prototype.pauseGame = function() {
	this.gamePause = true;
	this.showGamePauseMsg();
}

App.prototype.continueGame = function() {
	this.gamePause = false;
}

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

