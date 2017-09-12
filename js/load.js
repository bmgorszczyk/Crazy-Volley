var loadingBar;
var loadState = {

	preload: function() {

		game.add.image(0, 0, 'loadingScreen');
		loadingBar = game.add.sprite(282, game.world.centerY - 5, 'bar');
		
		game.load.setPreloadSprite(loadingBar);
		
		game.load.image('ball', 'assets/ball.png');
		game.load.image('background', 'assets/BG3.png');
	    game.load.image('ground', 'assets/2.png');
	    game.load.image('boxes','assets/boxes.png');
	    game.load.image('left-side','assets/left_side.png');
	    game.load.image('right-side','assets/right-side.png');
	    game.load.spritesheet('catt', 'assets/cat_sprite.png', 106, 160);
	    game.load.spritesheet('dog', 'assets/dog_sprite.png', 106, 160);
	    game.load.image('menu', 'assets/menu.png');
	    game.load.spritesheet('playBTN', 'assets/playBTN2.png', 317, 78);
	    game.load.spritesheet('aboutBTN', 'assets/aboutBTN2.png', 317, 78);
	    game.load.spritesheet('backBTN', 'assets/backBTN.png', 317, 78);
	    game.load.image('about', 'assets/about.png');
	    game.load.spritesheet('fbBTN', 'assets/fbBTN2.png');
	    game.load.spritesheet('dogWon', 'assets/dog_won.png');
	    game.load.spritesheet('catWon', 'assets/cat_won.png');
	    game.load.image('gamePaused', 'assets/game_paused.png');
	    game.load.image('choose_vs', 'assets/choose_vs.png');
	    game.load.spritesheet('pauseBTN', 'assets/pauseBTN.png');
	    game.load.spritesheet('pvpBtn', 'assets/pvpBtn.png', 317, 78);
	    game.load.spritesheet('pvCpuBtn', 'assets/pvCpuBtn.png', 317, 78);
	    game.load.spritesheet('gamepad', 'assets/gamepad.png', 100, 100);
	    game.load.spritesheet('goLeftBtn', 'assets/goLeftBtn.png', 50, 50);
	    game.load.spritesheet('goRightBtn', 'assets/goRightBtn.png', 50, 50);
	    game.load.spritesheet('letsJumpBtn', 'assets/jumpBtn.png', 50, 50);
	},

	create: function() {
		setTimeout(function(){
			game.state.start('menu');
		}, 1500)
	}
}