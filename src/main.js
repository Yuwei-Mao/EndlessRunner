//CMPM 120
//UC Santa Cruz

//game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    input: {
        gamepad: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
            gravity:{
                x: 0,
                Y: 0
            }
        }
    },
    scene: [Play]
}

//define game
let game = new Phaser.Game(config);

//define globals
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let quarterX = game.config.width / 4;
let quarterY = game.config.height / 4;

//define states
let haveSword = false;
let haveShield = false;
let swordMoving = false;
let shieldMoving = false;

//define timer
let timer = 0;

