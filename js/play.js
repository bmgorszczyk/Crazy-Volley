
var cursors, wasd;
var player1, player2, ball, groundL, groundR, boxes;
var score1 = 0, score2 = 0;
var c, d, i, result, yAxis;
var jumpTimer1=0, jumpTimer2 = 0;
var p1text, p2text, wintext, hej2;
var catW, dogW, backBTN, paused, pauseBTN;
var versus;
var gamepad, joystick, jump;

var playState = {

	init: function(versus) {
    	this.versus = versus;
  	},
  	preload: function() {
  		game.load.spritesheet('goLeftBtn', 'assets/goLeftBtn.png', 50, 50);
	    game.load.spritesheet('goRightBtn', 'assets/goRightBtn.png', 50, 50);
	    game.load.spritesheet('letsJumpBtn', 'assets/jumpBtn.png', 50, 50);
  	},

	create: function() {
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.add.image(0, 0, 'background');

		groundL = game.add.sprite(256, 575, 'left-side');
		groundR = game.add.sprite(768, 575, 'right-side');

		game.physics.p2.enable(groundL);
		game.physics.p2.enable(groundR);
		groundL.body.static = true;
		groundR.body.static = true;

		boxes = game.add.sprite(525, 395, 'boxes');
		game.physics.p2.enable(boxes);
		boxes.body.static = true;

	    ////---------------- PLAYERS AND BALL -----------------------///

		player1 = game.add.sprite(930, 450, 'catt');
		player1.animations.add('run', [23, 24, 25, 26, 27, 28, 29], 14, true);
		player1.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);

		game.physics.p2.enable(player1);
		player1.scale.setTo(0.75);
		player1.scale.x = -0.75;
		player1.body.mass = 5;
		player1.body.setCircle(60);
		player1.body.fixedRotation = true;
		player1.body.setZeroDamping();
		

		player2 = game.add.sprite(100, 450, 'dog');
		player2.animations.add('run2', [10, 11, 12, 13, 14, 15, 16, 17], 14, true);
		player2.animations.add('idle2', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
		player2.scale.setTo(0.75);

		game.physics.p2.enable(player2);
		player2.body.fixedRotation = true;
		player2.body.setZeroDamping();
		player2.body.mass = 5;
		player2.body.setCircle(60);
		
		ball = game.add.sprite(830, 300, 'ball');
		ball.scale.setTo(0.5);
		game.physics.p2.enable(ball);
		ball.body.setCircle(30);
		ball.body.mass = 2;
		ball.body.data.gravityScale = 0;

		catW = game.add.sprite(215, 150, 'catWon');
		catW.visible = false;
		dogW = game.add.sprite(215, 150, 'dogWon');
		dogW.visible = false;
		paused = game.add.sprite(320, 200, 'gamePaused');
		paused.visible = false;

		backBTN = game.add.button(game.world.centerX - 155, game.world.centerY + 20, 'backBTN', this.back, this, 1, 0);	
		backBTN.inputEnabled = true;
		backBTN.input.useHandCursor = true;
		backBTN.visible = false;

		pauseBTN = game.add.button(960, 580, 'pauseBTN');	
		pauseBTN.inputEnabled = true;
		pauseBTN.input.useHandCursor = true;
		pauseBTN.scale.setTo(0.7);

		leftBtn = game.add.button(820, 530, 'goLeftBtn');
		leftBtn.inputEnabled = true;
		leftBtn.visible = false;
		rightBtn = game.add.button(900, 530, 'goRightBtn');
		rightBtn.inputEnabled = true;
		rightBtn.visible = false;
		rightBtn.input.useHandCursor = true;
		jumpBtn = game.add.button(100, 530, 'letsJumpBtn');
		jumpBtn.inputEnabled = true;
		jumpBtn.visible = false;


		///----------------  COLLISION GROUPS --------------------- ///

		var p1CM = game.physics.p2.createMaterial('p1CM', player1.body);
	    var p2CM = game.physics.p2.createMaterial('p2CM', player2.body);
	    var ballCM = game.physics.p2.createMaterial('ballCM', ball.body);
	    var boxesCM = game.physics.p2.createMaterial('boxesCM', boxes.body);
	    var leftCM = game.physics.p2.createMaterial('leftCM', groundL.body);
	    var rightCM = game.physics.p2.createMaterial('rightCM', groundR.body);
	    var worldCM = game.physics.p2.createMaterial('worldCM');

		// ---------------- COLLISIONS ---------------------//

		game.physics.p2.setWorldMaterial(worldCM, true, true, true, true);
		var cm1 = game.physics.p2.createContactMaterial(worldCM, p1CM, p2CM, leftCM, rightCM, ballCM, boxesCM);
		var p1_right = game.physics.p2.createContactMaterial(p1CM, rightCM);
		var p2_left = game.physics.p2.createContactMaterial(p2CM, leftCM);
		var ball_world = game.physics.p2.createContactMaterial(ballCM, worldCM);

		ball_world.restitution = 0.6;
		p1_right.restitution = 0;
		p2_left.restitution = 0;
		
		//------------------

		game.physics.p2.gravity.y = 700;
		game.physics.p2.gravity.x = 0;
		game.physics.p2.restitution = 0.6;

		ball.body.onBeginContact.addOnce(this.hitBall, this);

		cursors = game.input.keyboard.createCursorKeys();

		wasd = {
		  up: game.input.keyboard.addKey(Phaser.Keyboard.W),
		  down: game.input.keyboard.addKey(Phaser.Keyboard.S),
		  left: game.input.keyboard.addKey(Phaser.Keyboard.A),
		  right: game.input.keyboard.addKey(Phaser.Keyboard.D),
		};


		//------------------- SCORE TEXT ---------------------//

		p1text = game.add.text(65, 10, '' + score1);
		p2text = game.add.text(937, 10, '' + score2);

		wintext = game.add.text(game.world.centerX - 100, game.world.centerY, '')

		p1text.fontSize = 30;
		p1text.fontWeight = 900;
		p1text.font = 'Verdana';
	    p1text.fill = 'white';
	    p1text.stroke = '#333';
	    p1text.strokeThickness = 3;

		p2text.fontSize = 30;
		p2text.fontWeight = 900;
		p2text.font = 'Verdana';
	    p2text.fill = 'white';
	    p2text.stroke = '#333';
	    p2text.strokeThickness = 3;

	    //--------------------- JOYSTICK -----------------------//

	    if(!game.device.desktop) {
	    	gamepad = game.plugins.add(Phaser.Plugin.VirtualGamepad);
	    	jump = gamepad.addButton(1200, 5800, 0.3, 'gamepad');
	    	joystick = gamepad.addJoystick(860, 570, 1.3, 'gamepad');	
		}	  
	},


	hitBall: function(body) {
	    if (body) {
	        ball.body.data.gravityScale = 1;
	        ball.body.mass = 0.1;
	    }
	},

	update: function() {
		if(!game.device.desktop){
			if (joystick.properties.up && game.time.now > jumpTimer1) {
		        if (this.checkIfCanJump1()) {
		            player1.body.moveUp(430);
		        	player1.animations.play('jump');
		        	jumpTimer1 = game.time.now + 750;
		        }
	 		}
	 		if (joystick.properties.left){
	    		player1.body.velocity.x = -350;
	    		player1.animations.play('run');
	    	}
	    	else if (joystick.properties.right){
	    		player1.body.velocity.x = 350;
	    		player1.animations.play('run');
	    	} else {
	    		player1.body.velocity.x = 0;
	    		player1.animations.play('idle');
	    	}
		} else {
		    if (cursors.up.isDown && game.time.now > jumpTimer1) {
		        if (this.checkIfCanJump1()) {
		            player1.body.moveUp(430);
		        	player1.animations.play('jump');
		        	jumpTimer1 = game.time.now + 750;
		        }
		
		 	}
			if (cursors.left.isDown)
		    {
		    	player1.body.velocity.x = -350;
		    	player1.animations.play('run');
		    }
		    else if (cursors.right.isDown)
		    {
		    	player1.body.velocity.x = 350;
		    	player1.animations.play('run');
		    }
		    else {
		    	player1.body.velocity.x = 0;
		    	player1.animations.play('idle');
		    }
		}
	    if(ball.body.y > 479){
			var p1win, p2win;
			if (ball.body.x > 512) {
				score1++;
				p1text.setText('' + score1);
				p2win = true;
				p1win = false;
			} else {
				score2++;
				p2text.setText('' + score2);
				p2win = false;
				p1win = true;
			}

			game.paused = true;
			player1.body.velocity.x = 0;
			player1.body.velocity.y = 0;
			setTimeout(function() {
	            game.paused = false;
	            player1.body.reset(930, 450);
	            player2.body.reset(100, 450);
	            if(p1win) {
	            	ball.body.reset(830, 120);
	            } else {
	            	ball.body.reset(150, 120);
	            }
			}, 1000);
	    }

	    if(versus == false) {
	    	if (wasd.left.isDown)
		    {
		    	player2.body.velocity.x = -350;
		    	player2.animations.play('run2');
		    }
		    else if (wasd.right.isDown)
		    {
		    	player2.body.velocity.x = 350;
		    	player2.animations.play('run2');
		    }
		    else {
		    	player2.body.velocity.x = 0;
		    	player2.animations.play('idle2');
		    }
		    if (wasd.up.isDown && game.time.now > jumpTimer2 && this.checkIfCanJump2()) {
		        player2.body.moveUp(430);
		        jumpTimer2 = game.time.now + 750;
			}
	    } else {
	    	if(ball.body.x < 479) {
		    	hej2 = Math.abs(player2.body.x - ball.body.x);
				var p2speed = 350;
			
		    	if (player2.body.x > ball.body.x) {
		    		player2.body.velocity.x = p2speed *-1;
		    		player2.animations.play('run2');
		    	}
		    	 if (player2.body.x < ball.body.x) {
		    		player2.body.velocity.x = p2speed;
		    		player2.animations.play('run2');
		    	}
		    	if (hej2 < 15) {
		    		player2.body.velocity.x = 0;
		    	}
		    	if (ball.body.y > 300 && game.time.now > jumpTimer2 && this.checkIfCanJump2()) {
		    		player2.body.moveUp(430);
		    		jumpTimer2 = game.time.now + 750;
		    	}
	    	}
		    if(ball.body.x > 479) {
		    	player2.animations.play('idle2');
		    }
	    }
	    

	    if(score1 == 15) {
	    	player2.body.static = true;
	    	player1.body.static = true;
	    	ball.body.static = true;
	    	dogW.visible = true;
	    	backBTN.visible = true;
	    }
	    else if (score2 == 15) {
	    	player2.body.static = true;
	    	player1.body.static = true;
	    	ball.body.static = true;
	    	catW.visible = true;
	    	backBTN.visible = true;
	    }

		pauseBTN.events.onInputUp.add(function() {
		    game.paused = true;
		    paused.visible = true;
		}, this);
		game.input.onDown.add(function() {
		    if (game.paused) {
		    	game.paused = false;
		    	paused.visible = false;
		    } 
		}, this);

	},

	checkIfCanJump1: function(){

	    var yAxis = p2.vec2.fromValues(0, 1);
	    var result = false;

	    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
	    {
	        var c = game.physics.p2.world.narrowphase.contactEquations[i];

	        if (c.bodyA === player1.body.data || c.bodyB === player1.body.data)
	        {
	            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
	            if (c.bodyA === player1.body.data) d *= -1;
	            if (d > 0.5) result = true;
	        }
	    }
	    
	    return result;
	},

	checkIfCanJump2: function(){

	    var yAxis = p2.vec2.fromValues(0, 1);
	    var result = false;

	    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
	    {
	        var c = game.physics.p2.world.narrowphase.contactEquations[i];

	        if (c.bodyA === player2.body.data || c.bodyB === player2.body.data)
	        {
	            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
	            if (c.bodyA === player2.body.data) d *= -1;
	            if (d > 0.5) result = true;
	        }
	    }
	    
	    return result;
	},

	back: function() {
		score1 = score2 = 0;
		game.state.start('menu');
	},

	render: function() {

	},
}