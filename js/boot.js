var bootState = {
	preload: function() {
		game.load.image('bar', 'assets/loading_bar.png');
		game.load.image('loadingScreen', 'assets/loading_screen.png');
	},

	create: function() {
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.state.start('load');
	}

};