var game = new Phaser.Game(1024, 640, Phaser.AUTO, 'Crazy volley');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('choose', chooseState);
game.state.add('about', aboutState);
game.state.add('play', playState);

game.state.start('boot');