(function() {
	var keys = {
		SHIFT: 16,
		CTRL: 17,
		SPACE: 32,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40
	};

	function isKey(key) {
		var code;
		if (typeof keys[key] != 'undefined') {
			code = keys[key];
		} else {
			code = key.charCodeAt(0);
		}
		return (event.keyCode == code);
	}

	window.input = {
		isKey: function(key) {
			return isKey(key.toUpperCase());
		}
	};
})();