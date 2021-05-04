class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                              
            loadingBar.fillStyle(0xff0000, 1);                
            loadingBar.fillRect(0, centerY, w * value, 16);  
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';

        this.load.atlas('coin_atlas', 'coin.png', 'coin.json');
        this.load.atlas('shield_atlas', 'shield.png', 'shield.json');
        this.load.atlas('sword_atlas', 'sword.png', 'sword.json');
        this.load.atlas('monster_atlas', 'monster.png', 'monster.json');
        this.load.atlas('banana_atlas', 'banana.png', 'banana.json');
        this.load.atlas('cha_atlas', 'character.png', 'character.json');
        this.load.bitmapFont('gem', 'gem.png', 'gem.xml');
        this.load.atlas('platformer_atlas', 'kenny_sheet.png', 'kenny_sheet.json');
    }

    create() {
        // go to Title scene
        this.scene.start('titleScene');
    }
}