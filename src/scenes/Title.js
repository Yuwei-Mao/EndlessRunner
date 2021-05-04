class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        // add title screen text
        let title01 = this.add.bitmapText(centerX - 3*textSpacer, centerY + 4.5*textSpacer, 'gem', 'Ligen Han', 20).setOrigin(0.5).setTint(0xb0f542);
        let title02 = this.add.bitmapText(centerX, centerY + 4.5*textSpacer, 'gem', 'Yuwei Mao', 20).setOrigin(0.5).setTint(0xff00ff);
        let title03 = this.add.bitmapText(centerX + 3*textSpacer, centerY + 4.5*textSpacer, 'gem', 'Henry Huang', 20).setOrigin(0.5).setTint(0xffff00);
        let title04 = this.add.bitmapText(centerX, centerY, 'gem', 'Santa Cruz Skateboarding', 64).setOrigin(0.5).setTint(0x0099ff);
        let title05 = this.add.bitmapText(centerX, centerY, 'gem', 'Santa Cruz Skateboarding', 64).setOrigin(0.5).setTint(0x0077ff).setBlendMode('SCREEN');
       
        this.add.bitmapText(centerX, centerY + 2*textSpacer, 'gem', 'Press UP ARROW to Continue', 36).setOrigin(0.5);

        // title text tween
        this.tweens.add({
            targets: title01,
            duration: 2500,
            angle: { from: -1, to: 1 },
            yoyo: true,
            repeat: -1,
            onRepeat: function() {
                this.cameras.main.shake(100, 0.0025);
            },
            onRepeatScope: this
        });

        this.tweens.add({
            targets: title02,
            duration: 2500,
            angle: { from: -1, to: 1 },
            yoyo: true,
            repeat: -1,
            onRepeat: function() {
                this.cameras.main.shake(100, 0.0025);
            },
            onRepeatScope: this
        });

        this.tweens.add({
            targets: title03,
            duration: 2500,
            angle: { from: -1, to: 1 },
            yoyo: true,
            repeat: -1,
            onRepeat: function() {
                this.cameras.main.shake(100, 0.0025);
            },
            onRepeatScope: this
        });

        this.tweens.add({
            targets: title04,
            duration: 2500,
            angle: { from: -3, to: 3 },
            yoyo: true,
            repeat: -1,
            onYoyo: function() {
                this.cameras.main.shake(100, 0.25);
            },
            onYoyoScope: this
        });

        this.tweens.add({
            targets: title05,
            duration: 2500,
            angle: { from: -3, to: 3 },
            yoyo: true,
            repeat: -1,
            onRepeat: function() {
                this.cameras.main.shake(100, 0.25);
            },
            onRepeatScope: this
        });


        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update() {
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
          
            // start next scene
            this.scene.start('menuScene');
        }
    }
}