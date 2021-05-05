class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {

        //load background
        this.load.image('bg','assets/bp4.png');

    }

    create() {
        this.bg = this.add.tileSprite(0, 0,960,640,'bg').setOrigin(0,0);


        this.player = this.add.sprite(7*textSpacer, 3*textSpacer, 'cha_atlas', 'skating0001').setScale(SCALE/2);
        this.anims.create({
            key: 'skate',
            frames: this.anims.generateFrameNames('cha_atlas', {
                prefix: 'skating',
                start: 1,
                end: 5,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1
        });
        this.player.anims.play('skate', true);

        // add title screen text
        let title01 = this.add.bitmapText(centerX - 3*textSpacer, centerY + 4.5*textSpacer, 'gem', 'Ligen Han', 20).setOrigin(0.5).setTint(0x4ea832);
        let title02 = this.add.bitmapText(centerX, centerY + 4.5*textSpacer, 'gem', 'Yuwei Mao', 20).setOrigin(0.5).setTint(0xff00ff);
        let title03 = this.add.bitmapText(centerX + 3*textSpacer, centerY + 4.5*textSpacer, 'gem', 'Henry Huang', 20).setOrigin(0.5).setTint(0xffff00);
        let title04 = this.add.bitmapText(centerX, centerY, 'gem', 'Santa Cruz Skateboarding', 64).setOrigin(0.5).setTint(0x0099ff);
        let title05 = this.add.bitmapText(centerX, centerY, 'gem', 'Santa Cruz Skateboarding', 64).setOrigin(0.5).setTint(0x0077ff).setBlendMode('SCREEN');
       
        this.add.bitmapText(centerX, centerY + 2*textSpacer, 'gem', 'Press UP ARROW to Continue', 36).setOrigin(0.5).setTint(0xa83232);
        this.add.bitmapText(centerX, centerY + 3*textSpacer, 'gem', 'Press Down ARROW for Credit', 36).setOrigin(0.5).setTint(0xa83232);

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
          
            // start gameplay scene
            this.sound.play('switch');
            this.scene.start('menuScene');
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.down)){
            // start credit scene
            this.sound.play('switch');
            this.scene.start('creditScene');
        }
    }
}