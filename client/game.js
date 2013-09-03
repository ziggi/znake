$(function() {
	var isKeyLocked = false;
	var app = new App();
	
	var calcTimer = setInterval(function() {
		if (!app.isStatusOn() || app.isStatusPause()) {
			return;
		}
		
		var isEnd = app.snake.move();
		app.updateScene();
		
		if (isEnd) {
			app.setGameOff(isEnd);
		}
		
		isKeyLocked = false;
	}, 1000 / 6);
	

	$('body').keydown(function(event) {
		if (app.isStatusPause()) {
			if (app.isKeySpace(event)) {
				app.setPauseOff();
			}
		} else if (!app.isStatusOn()) {
			if (app.isKeySpace(event)) {
				app.setGameOn();
			}
		} else {
			if (app.isKeyPause(event)) {
				app.setPauseOn();
				return;
			}
			
			if (isKeyLocked) {
				return;
			}
			isKeyLocked = true;
			
			if (app.isKeyUp(event) && !app.snake.isRouteDown()) {
				app.snake.setRouteUp();
			} else if (app.isKeyDown(event) && !app.snake.isRouteUp()) {
				app.snake.setRouteDown();
			} else if (app.isKeyLeft(event) && !app.snake.isRouteRight()) {
				app.snake.setRouteLeft();
			} else if (app.isKeyRight(event) && !app.snake.isRouteLeft()) {
				app.snake.setRouteRight();
			}
		}
	});

});
