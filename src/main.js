//CMPM 120
//UC Santa Cruz

//game configuration
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Load, Title, Menu, Play]
}

//define game
let game = new Phaser.Game(config);

//define globals
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let quarterX = game.config.width / 4;
let quarterY = game.config.height / 4;
let w = game.config.width;
let h = game.config.height;
const textSpacer = 64;
const SCALE = 4;
let cursors;

//define states
let haveSword = false;
let haveShield = false;
let swordMoving = false;
let shieldMoving = false;

//define timer
let timer = 0;
let timerForBg = 0;

