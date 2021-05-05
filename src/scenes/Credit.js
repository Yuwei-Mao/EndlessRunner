class Credit extends Phaser.Scene {
    constructor() {
        super('creditScene');
    }

    preload() {

        //load background
        this.load.image('bg','assets/bp4.png');

    }

    create() {

        this.bg = this.add.tileSprite(0, 0,960,640,'bg').setOrigin(0,0);


        // add title screen text
        let title011 = this.add.bitmapText(centerX - textSpacer, 3.5*textSpacer, 'gem', 'Ligen Han', 20).setOrigin(0.5).setTint(0x4ea832);
        let title012 = this.add.bitmapText(centerX - 2* textSpacer, 6.5*textSpacer, 'gem', 'Ligen Han', 20).setOrigin(0.5).setTint(0x4ea832);
        let title021 = this.add.bitmapText(centerX + textSpacer, 3.5*textSpacer, 'gem', 'Yuwei Mao', 20).setOrigin(0.5).setTint(0xff00ff);
        let title022 = this.add.bitmapText(centerX + 2*textSpacer, 6.5* textSpacer, 'gem', 'Yuwei Mao', 20).setOrigin(0.5).setTint(0xff00ff);
        let title023 = this.add.bitmapText(centerX - textSpacer, 9.5*textSpacer, 'gem', 'Yuwei Mao', 20).setOrigin(0.5).setTint(0xff00ff);
        let title031 = this.add.bitmapText(centerX , 6.5*textSpacer, 'gem', 'Henry Huang', 20).setOrigin(0.5).setTint(0xffff00);
        let title032 = this.add.bitmapText(centerX + textSpacer, 9.5*textSpacer, 'gem', 'Henry Huang', 20).setOrigin(0.5).setTint(0xffff00);
        let title04 = this.add.bitmapText(centerX, 2*textSpacer, 'gem', 'Programming', 64).setOrigin(0.5).setTint(0x0099ff);
        let title05 = this.add.bitmapText(centerX, 5*textSpacer, 'gem', 'Art', 64).setOrigin(0.5).setTint(0x0099ff);
        let title06 = this.add.bitmapText(centerX, 8*textSpacer, 'gem', 'Music', 64).setOrigin(0.5).setTint(0x0099ff);
        let tilte07 = this.add.bitmapText(13*textSpacer, 9.5*textSpacer,'gem','Press Left Arrow to go back.', 16).setOrigin(0.5).setTint(0xa83232);


        this.player = this.add.sprite(2*textSpacer, 3*textSpacer, 'cha_atlas', 'skating0001').setScale(SCALE/2);
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

        this.player1 = this.add.sprite(2*textSpacer, 7*textSpacer, 'cha_atlas', 'jump0001').setScale(SCALE/2);
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNames('cha_atlas', {
                prefix: 'jump',
                start: 1,
                end: 5,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1
        });
        this.player1.anims.play('jump', true);

        this.player2 = this.add.sprite(13*textSpacer, 3*textSpacer, 'action_atlas', 'pokingSword0001').setScale(SCALE/2);
        this.anims.create({
            key: 'poke',
            frames: this.anims.generateFrameNames('action_atlas', {
                prefix: 'pokingSword',
                start: 1,
                end: 5,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1
        });
        this.player2.anims.play('poke', true);

        this.player3 = this.add.sprite(13*textSpacer, 7*textSpacer, 'action_atlas', 'wavingShield0001').setScale(SCALE/2);
        this.anims.create({
            key: 'swing',
            frames: this.anims.generateFrameNames('action_atlas', {
                prefix: 'wavingShield',
                start: 1,
                end: 5,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            repeat: -1
        });
        this.player3.anims.play('swing', true);



        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();  
    }


    update(){
        if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
          
            // start gameplay scene
            this.sound.play('switch');
            this.scene.start('titleScene');
        }
    }


}
