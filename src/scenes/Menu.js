class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    
    preload() {

        //load background
        this.load.image('bg','assets/bp4.png');

    }

    
    
    create() {

        this.bg = this.add.tileSprite(0, 0,960,640,'bg').setOrigin(0,0);

        let menuConfig = {
            fontFamily: 'emoji',
            fontSize: '28px',
            backgroundColor: '#F34141',
            color: '#ffffff',
            fixedWidth: 0
        }

        this.add.bitmapText(textSpacer, 1/2*textSpacer, 'gem', 'You will be skateboarding around Santa Cruz.', 22).setOrigin(0,0).setTint(0x32a860);
        this.add.bitmapText(textSpacer, 1.25*textSpacer, 'gem', 'This will definitely be an adventure filled with joy and danger.', 20).setOrigin(0,0).setTint(0x32a860);
        this.add.bitmapText(textSpacer, 2*textSpacer, 'gem', 'You can press Space Bar to jump.', 20).setOrigin(0,0).setTint(0x32a860);
        this.add.bitmapText(textSpacer, 3*textSpacer, 'gem', 'Try to avoid all the monsters and obstacles.', 20).setOrigin(0,0).setTint(0x32a860);
        this.add.bitmapText(textSpacer, 6*textSpacer, 'gem', 'Try to collect coins and items.', 20).setOrigin(0,0).setTint(0x32a860);
        this.add.bitmapText(textSpacer, 8.8*textSpacer, 'gem', 'Survive as long as you can to prove you are the GOAT!', 20).setOrigin(0,0).setTint(0x32a860);
        this.add.bitmapText(5*textSpacer, 4.5*textSpacer, 'gem', 'Monsters and banana peels will make your journey end instantly.', 20).setOrigin(0,0).setTint(0xa84632);
        this.add.bitmapText(5.5*textSpacer, 7*textSpacer, 'gem', 'Shield makes the character invincible for 10s.', 20).setOrigin(0,0).setTint(0xa84632);
        this.add.bitmapText(5.5*textSpacer, 8.1*textSpacer, 'gem', 'Sword grants the ability of killing monsters for 10s.', 20).setOrigin(0,0).setTint(0xa84632);
        this.add.bitmapText(2.5*textSpacer, 7.5*textSpacer, 'gem', 'Bonus points!', 20).setOrigin(0,0).setTint(0xa84632);




        let menuConfig1 = {
            fontFamily: 'emoji',
            fontSize: '24px',
            backgroundColor: '#F34141',
            color: '#03fc30',
            fixedWidth: 0
        }
        this.add.bitmapText(11*textSpacer, 9.5*textSpacer,'gem','Press Right Arrow to start the game.',20).setOrigin(0.5).setTint(0x3432a8);
        this.add.bitmapText(3*textSpacer, 9.5*textSpacer,'gem','Press Left Arrow to go back.',20).setOrigin(0.5).setTint(0x3432a8);



        this.coin = this.add.sprite(2*textSpacer, 7.5*textSpacer, 'coin_atlas', 'coin0001').setScale(SCALE);
        this.shield = this.add.sprite(5*textSpacer, 7*textSpacer, 'shield_atlas', 'shield0001').setScale(SCALE/2);
        this.sword = this.add.sprite(5*textSpacer, 8*textSpacer, 'sword_atlas', 'sword0001').setScale(SCALE/2);
        this.monster = this.add.sprite(4*textSpacer, 4.5*textSpacer, 'monster_atlas', 'monster0001').setScale(SCALE/2);
        this.banana = this.add.sprite(2*textSpacer, 4.5*textSpacer, 'banana_atlas', 'banana0001').setScale(SCALE/2);

        this.anims.create({
            key: 'coinmove',
            frames: [
                { frame: 'coin0001' },
                { frame: 'coin0002' },
                { frame: 'coin0003' },
                { frame: 'coin0004' }
            ],
            defaultTextureKey: 'coin_atlas',
            repeat: -1
        });
        // go ahead and start the flapping animation since the fly is non-interactive
        this.coin.anims.play('coinmove');

        this.anims.create({
            key: 'shieldmove',
            frames: [
                { frame: 'shield0001' },
                { frame: 'shield0002' },
                { frame: 'shield0003' },
                { frame: 'shield0004' }
            ],
            defaultTextureKey: 'shield_atlas',
            repeat: -1
        });
        // go ahead and start the flapping animation since the fly is non-interactive
        this.shield.anims.play('shieldmove');

        this.anims.create({
            key: 'swordmove',
            frames: [
                { frame: 'sword0001' },
                { frame: 'sword0002' },
                { frame: 'sword0003' },
                { frame: 'sword0004' }
            ],
            defaultTextureKey: 'sword_atlas',
            repeat: -1
        });
        // go ahead and start the flapping animation since the fly is non-interactive
        this.sword.anims.play('swordmove');

        this.anims.create({
            key: 'monstermove',
            frames: [
                { frame: 'monster0001' },
                { frame: 'monster0002' },
                { frame: 'monster0003' },
                { frame: 'monster0004' },
                { frame: 'monster0005' }
            ],
            defaultTextureKey: 'monster_atlas',
            repeat: -1
        });
        // go ahead and start the flapping animation since the fly is non-interactive
        this.monster.anims.play('monstermove');

        this.anims.create({
            key: 'bananamove',
            frames: [
                { frame: 'banana0001' },
                { frame: 'banana0002' },
                { frame: 'banana0003' },
                { frame: 'banana0004' },
                { frame: 'banana0005' }
            ],
            defaultTextureKey: 'banana_atlas',
            repeat: -1
        });
        // go ahead and start the flapping animation since the fly is non-interactive
        this.banana.anims.play('bananamove');

        
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(cursors.right)) {
            this.sound.play('switch');
            this.scene.start('playScene');
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
            this.sound.play('switch');
            this.scene.start('titleScene');
        }
    }
}