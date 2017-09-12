var pvsCpuBtn, pvspBtn, backBTN;
var versus;
var chooseState = {
	create: function() {
		game.add.image(0, 0, 'choose_vs');

		pvsCpuBtn = game.add.button(game.world.centerX - 150, game.world.centerY - 100, 'pvCpuBtn', this.play1, this, 1, 0);	
		pvsCpuBtn.inputEnabled = true;
		pvsCpuBtn.input.useHandCursor = true;
		pvspBtn = game.add.button(game.world.centerX - 150, game.world.centerY - 10, 'pvpBtn', this.play2, this, 1, 0);
		pvspBtn.inputEnabled = true;
		pvspBtn.input.useHandCursor = true;
		backBTN = game.add.button(game.world.centerX - 150, game.world.centerY + 80, 'backBTN', this.back, this, 1, 0);
		backBTN.inputEnabled = true;
		backBTN.input.useHandCursor = true;
	},

	play1: function() {
		versus = true;
		game.state.start('play', true, false, versus);
	},

	play2: function() {
		versus = false;
		game.state.start('play', true, false, versus);
	},

	back: function() {
		game.state.start('menu');
	},
}