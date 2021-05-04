class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    create() {


        let menuConfig = {
            fontFamily: 'emoji',
            fontSize: '28px',
            backgroundColor: '#F34141',
            color: '#ffffff',
            fixedWidth: 0
        }


        this.add.text(textSpacer, 1/2*textSpacer,'You will be skateboarding around Santa Cruz.', menuConfig).setOrigin(0,0);
        this.add.text(textSpacer, 1.25*textSpacer,'This will definitely be an adventure filled with joy and danger.', menuConfig).setOrigin(0,0);
        this.add.text(textSpacer, 2*textSpacer,'You can press Space Bar to jump.', menuConfig).setOrigin(0,0);
        this.add.text(textSpacer, 3*textSpacer,'Try to avoid all the monsters and obstacles.', menuConfig).setOrigin(0,0);
        this.add.text(textSpacer, 6*textSpacer,'Try to collect coins and items.', menuConfig).setOrigin(0,0);
        this.add.text(textSpacer, 9*textSpacer,'Survive as long as you can to prove you are the GOAT!', menuConfig).setOrigin(0,0);
        this.add.text(5*textSpacer, 4.5*textSpacer,'Monsters and banana peels will make your journey end instantly.')
        this.add.text(5.5*textSpacer, 7*textSpacer,'Shield makes the character invincible for banana peels for 5s.')
        this.add.text(5.5*textSpacer, 8*textSpacer,'Sword grants the ability of killing monsters for 10s.')
        this.add.text(2.5*textSpacer, 7.5*textSpacer,'Bonus points!')



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
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
                let textureManager = this.textures;
                // take snapshot of the entire game viewport
                // https://newdocs.phaser.io/docs/3.54.0/Phaser.Renderer.WebGL.WebGLRenderer#snapshot
                // .snapshot(callback, type, encoderOptions)
                this.game.renderer.snapshot((image) => {
                    // make sure an existing texture w/ that key doesn't already exist
                    if(textureManager.exists('titlesnapshot')) {
                        textureManager.remove('titlesnapshot');
                    }
                    // take the snapshot img returned from callback and add to texture manager
                    textureManager.addImage('titlesnapshot', image);
                });
          
            // start next scene
            this.scene.start('playScene');
        }
    }
}