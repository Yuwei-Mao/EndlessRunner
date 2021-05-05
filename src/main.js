//CMPM 120
//UC Santa Cruz
//Creative Tilt
//The game theme is technically interesting even though Jumping is the only game mechanic we implemented. We are proud of using a lot of
//programming techniques to finish this project, but the one we are the most proud of is to use Javascript to add animations into our game.
//Our game definitely has wonderful visual style. We don't feel quite familiar about make gaming auido and gaming art, so we are pretty satisfield
//about the music and art we made. In our endless runner game, it includes not only enemies and obstacles that you need to dodge, but also some items
//that give the character the ability to kill enemies or make the character invincible for a short amount of time. In other words, our game has more diversity.

//GameName: Santa Cruz Skateboarding
//Group number Name: Henry Huang, Ligen Han, Yuwei Mao
//Date: 05/03/21

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
    scene: [Load, Title, Credit, Menu, Play, Gameover]
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

let jumpn =0;
let highscore =0;
