function Snake(game) {
	// get data from game
	this.game = game;

	// route const
	this.ROUTE = {
		UP: 2,
		DOWN: 0,
		LEFT: 1,
		RIGHT: 3
	};
	
	// snake body
	var defaultPosX = Math.ceil(this.game.sceneWidth / 2);
	var defaultPosY = Math.ceil(this.game.sceneHeight / 2);
	
	this.body = [
		{x: defaultPosX, y: defaultPosY - 1},
		{x: defaultPosX, y: defaultPosY},
		{x: defaultPosX, y: defaultPosY + 1}
	];
	
	// set route
	this.setRoute('UP');
}

Snake.prototype.update = function() {
	var newSnakeElement = {
		x: this.body[0].x,
		y: this.body[0].y
	};
	
	// update position
	if (this.isRoute('UP')) {
		newSnakeElement.y -= 1;
	} else if (this.isRoute('DOWN')) {
		newSnakeElement.y += 1;
	} else if (this.isRoute('LEFT')) {
		newSnakeElement.x -= 1;
	} else if (this.isRoute('RIGHT')) {
		newSnakeElement.x += 1;
	}
	
	// if on itself
	for (var i = 0; i < this.getSize() - 1; i++) {
		if (newSnakeElement.x == this.body[i].x && newSnakeElement.y == this.body[i].y) {
			this.game.setStatus(this.game.STATUS.GAMEOVER);
			return;
		}
	}
	
	// if outside scene
	var isOutsideX = newSnakeElement.x < 0 || newSnakeElement.x > this.game.sceneWidth - 1;
	var isOutsideY = newSnakeElement.y < 0 || newSnakeElement.y > this.game.sceneHeight - 1;
	
	if (isOutsideX || isOutsideY) {
		this.game.setStatus(this.game.STATUS.GAMEOVER);
		return;
	}
	
	// update array
	this.body.pop();
	this.body.unshift(newSnakeElement);
	
	// if on apple
	if (newSnakeElement.x == this.game.apple.pos.x && newSnakeElement.y == this.game.apple.pos.y) {
		// increase score
		this.game.score++;

		// check for win
		var isWin = this.addElement();
		if (isWin) {
			this.game.apple.remove();
			this.game.setStatus(this.game.STATUS.GAMEWIN);
		} else {
			// new apple
			this.game.apple.create();
		}
	}
	
	return 0;
}

Snake.prototype.render = function() {
	for (var i = this.getSize() - 1; i != -1; i--) {
		if (i == 0) {
			this.game.context.fillStyle = this.game.snakeHeadColor;
		} else {
			this.game.context.fillStyle = this.game.snakeColor;
		}
		this.game.context.fillRect(this.body[i].x * this.game.cellSize + 1, this.body[i].y * this.game.cellSize + 1, this.game.cellSize - 2, this.game.cellSize - 2);
	}
}

Snake.prototype.addElement = function() {
	// get place to adding
	var last_index = this.body.length - 1;
	
	var newSnakeElement = {
		x: this.body[last_index].x,
		y: this.body[last_index].y
	};
	
	var x_diff = this.body[last_index].x - this.body[last_index - 1].x;
	var y_diff = this.body[last_index].y - this.body[last_index - 1].y;
	
	if (x_diff > 0) {
		newSnakeElement.x += 1;
	} else if (x_diff < 0) {
		newSnakeElement.x -= 1;
	} else if (y_diff > 0) {
		newSnakeElement.y += 1;
	} else if (y_diff < 0) {
		newSnakeElement.y -= 1;
	}
	
	// push in array
	this.body.push(newSnakeElement);
	
	// check on win
	if (this.getSize() == this.game.sceneWidth * this.game.sceneHeight) {
		return true;
	}

	return false;
}

Snake.prototype.getSize = function() {
	return this.body.length;
}

Snake.prototype.setRoute = function(value) {
	this.route = this.ROUTE[value];
}

Snake.prototype.isRoute = function(value) {
	return this.route == this.ROUTE[value];
}
