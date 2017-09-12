var startBtn, aboutBtn;
var menuState = {
	create: function() {

		game.add.image(0, 0, 'menu');
		startBtn = game.add.button(game.world.centerX - 150, game.world.centerY, 'playBTN', this.start, this, 1, 0);
		startBtn.inputEnabled = true;
		startBtn.input.useHandCursor = true;
		aboutBtn = game.add.button(game.world.centerX - 150, game.world.centerY + 90, 'aboutBTN', this.aboutP, this, 1, 0);
		aboutBtn.inputEnabled = true;
		aboutBtn.input.useHandCursor = true;
	},

	start: function() {
		game.state.start('choose');
	},

	aboutP: function() {
		game.state.start('about');
	}
}