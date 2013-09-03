$(function() {
	var isKeyLocked = false;
	var app = new App();
	
	var calcTimer = setInterval(function() {
		if (!app.isGameStart() || app.isGamePause()) {
			return;
		}
		
		var isEnd = app.snake.move();
		app.updateScene();
		
		if (isEnd) {
			app.stopGame(isEnd);
		}
		
		isKeyLocked = false;
	}, 1000 / 6);
	

	$('body').keydown(function(event) {
		if (app.isGamePause()) {
			if (app.isKeySpace(event)) {
				app.continueGame();
			}
		} else if (!app.isGameStart()) {
			if (app.isKeySpace(event)) {
				app.startGame();
			}
		} else {
			if (app.isKeyPause(event)) {
				app.pauseGame();
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
