class Gameover extends Phaser.Scene {
    constructor() {
        super('overScene');
    }

    preload() {

        //load background
        this.load.image('bg','assets/bp4.png');

    }

    create() {

        this.bg = this.add.tileSprite(0, 0,960,640,'bg').setOrigin(0,0);

        this.add.bitmapText(centerX, centerY, 'gem', 'GAME OVER', 64).setOrigin(0.5).setTint(0xd90000);
        this.add.bitmapText(centerX, centerY+1*textSpacer, 'gem', 'HIGH SOCRE: '+ highscore, 32).setOrigin(0.5).setTint(0xd90000);
        this.add.bitmapText(centerX, centerY+3*textSpacer, 'gem', 'Press UP Arrow to restart', 20).setOrigin(0.5).setTint(0xd90000);
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {           
            this.sound.play('switch');
            this.scene.start('playScene');
        }
    }

}
