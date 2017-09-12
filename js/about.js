var backBTN, fbBTN;
var aboutState = {
	create: function() {
		game.add.image(0, 0, 'about');

		backBTN = game.add.button(game.world.centerX - 155, game.world.centerY + 120, 'backBTN', this.back, this, 1, 0);	
		backBTN.inputEnabled = true;
		backBTN.input.useHandCursor = true;
		fbBTN = game.add.button(game.world.centerX - 40, game.world.centerY - 20, 'fbBTN', this.goFb, this, 1, 0);
		fbBTN.inputEnabled = true;
		fbBTN.input.useHandCursor = true;
	},

	back: function() {
		game.state.start('menu');
	},

	goFb: function() {
		window.open("https://www.facebook.com/bartek.gorszczyk?ref=bookmarks", "_blank");
	}
}