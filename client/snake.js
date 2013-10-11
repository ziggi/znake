function Snake(app) {
	// get data from app
	this.sceneWidth = app.sceneWidth;
	this.sceneHeight = app.sceneHeight;
	this.cellSize = app.cellSize;

	// apple object
	this.apple = {x: -1, y: -1};
	
	// snake body
	var default_x = Math.ceil(this.sceneWidth / 2);
	var default_y = Math.ceil(this.sceneHeight / 2);
	
	this.body = [
		{x: default_x, y: default_y - 1},
		{x: default_x, y: default_y},
		{x: default_x, y: default_y + 1}
	];
	
	// set route
	this.setRouteUp();
}

Snake.prototype.move = function() {
	var new_element = {x: this.body[0].x, y: this.body[0].y};
	
	// update position
	if (this.isRouteUp()) {
		new_element.y -= 1;
	} else if (this.isRouteDown()) {
		new_element.y += 1;
	} else if (this.isRouteLeft()) {
		new_element.x -= 1;
	} else if (this.isRouteRight()) {
		new_element.x += 1;
	}
	
	// if on itself
	for (var i = 0; i < this.getSize() - 1; i++) {
		if (new_element.x == this.body[i].x && new_element.y == this.body[i].y) {
			return 1;
		}
	}
	
	// if outside scene
	var isOutsideX = new_element.x < 0 || new_element.x > this.sceneWidth - 1;
	var isOutsideY = new_element.y < 0 || new_element.y > this.sceneHeight - 1;
	
	if (isOutsideX || isOutsideY) {
		return 1;
	}
	
	// update array
	this.body.pop();
	this.body.unshift(new_element);
	
	// if on apple
	if (new_element.x == this.apple.x && new_element.y == this.apple.y) {
		// trigger event
		document.dispatchEvent( new Event('snakeEatEvent') );

		// check for win
		var isWin = this.addElement();
		if (isWin) {
			this.apple = {x: -1, y: -1};
			return 2;
		}

		// new apple
		this.createApple();
	}
	
	return 0;
}

Snake.prototype.createApple = function() {
	// set new apple pos
	var newPos = {
		x: Math.floor(Math.random() * this.sceneWidth),
		y: Math.floor(Math.random() * this.sceneHeight)
	};
	
	// not on previous pos
	if (newPos.x == this.apple.x && newPos.y == this.apple.y) {
		this.createApple();
		return;
	}
	
	// not on snake
	for (var i = 0; i < this.getSize(); i++) {
		if (newPos.x == this.body[i].x && newPos.y == this.body[i].y) {
			this.createApple();
			return;
		}
	}
	
	// update
	this.apple.x = newPos.x;
	this.apple.y = newPos.y;
}

Snake.prototype.addElement = function() {
	// get place to adding
	var last_index = this.body.length - 1;
	
	var new_element = {
		x: this.body[last_index].x,
		y: this.body[last_index].y
	};
	
	var x_diff = this.body[last_index].x - this.body[last_index - 1].x;
	var y_diff = this.body[last_index].y - this.body[last_index - 1].y;
	
	if (x_diff > 0) {
		new_element.x += 1;
	} else if (x_diff < 0) {
		new_element.x -= 1;
	} else if (y_diff > 0) {
		new_element.y += 1;
	} else if (y_diff < 0) {
		new_element.y -= 1;
	}
	
	// push in array
	this.body.push(new_element);
	
	// check on win
	if (this.getSize() == this.sceneWidth * this.sceneHeight) {
		return true;
	}

	return false;
}

Snake.prototype.getSize = function(route) {
	return this.body.length;
}

Snake.prototype.setRouteUp = function() {
	this.route = 2;
}

Snake.prototype.setRouteDown = function() {
	this.route = 0;
}

Snake.prototype.setRouteLeft = function() {
	this.route = 1;
}

Snake.prototype.setRouteRight = function() {
	this.route = 3;
}

Snake.prototype.isRouteUp = function() {
	return this.route == 2;
}

Snake.prototype.isRouteDown = function() {
	return this.route == 0;
}

Snake.prototype.isRouteLeft = function() {
	return this.route == 1;
}

Snake.prototype.isRouteRight = function() {
	return this.route == 3;
}
