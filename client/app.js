/*

	Znake!
	
	Snake game with HTML5

*/

var game = new Game();

// app init function
function init() {
	game.init();
	setInterval(main, 1000 / 6);
}

// main game loop
function main() {
	game.update();
	game.render();
};

document.addEventListener('keydown', function(e) {
	game.handleInput(e);
});

// on ready
init();