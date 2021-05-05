class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload() {

        //load background
        this.load.image('sea','assets/sea_bg.png');
        this.load.image('forest','assets/forest_bg.png');

    }

    create() {

         //creating animation for player
        // skating animation
        this.anims.create({
            key: 'skate',
            frames: this.anims.generateFrameNames('cha_atlas', {
                prefix: 'skating',
                start: 1,
                end: 5,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: -1
        });


        //jump animation
        this.anims.create({
            key: 'jump',
            defaultTextureKey: 'cha_atlas',
            frames: [
                
                { frame: 'jump0004' },

            ],
        });

        //skating animation while having sword
        this.anims.create({
            key: 'skatingwithSword',
            frames: this.anims.generateFrameNames('holditemskating_atlas', {
                prefix: 'holdingSword',
                start: 1,
                end: 6,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: -1
        });


        //skating animation while having shield
        this.anims.create({
            key: 'skatingwithShield',
            frames: this.anims.generateFrameNames('holditemskating_atlas', {
                prefix: 'holdingShield',
                start: 1,
                end: 6,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: -1
        });



        // poke sword animation
        this.anims.create({
            key: 'attack',
            defaultTextureKey: 'action_atlas',
            frames: [

                { frame: 'pokingSword0003' },

            ],
        });

        // use shield defend animation
        this.anims.create({
            key: 'defend',
            defaultTextureKey: 'action_atlas',
            frames: [

                { frame: 'wavingShield0003' },

            ],
        });


        //define constants of physics
        this.MAX_JUMPS = 1;
        this.JUMP_VELOCITY = -850;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.physics.world.gravity.y = 2600;
        this.playerVelocity = 300;
        this.enemyVelocity = 300;
        this.rewardVelocity1 = 300;
        this.rewardVelocity2 = 300;


        //Place background
        this.bg = this.add.tileSprite(0, 0,960,640,'sea').setOrigin(0,0);
        this.bg2 = this.add.tileSprite(2000,2000,960,640,'forest').setOrigin(0,0);

        //add player
        this.p1 = this.physics.add.sprite(0,centerY,'cha_atlas','skating0001').setScale(SCALE/3);
        this.p1.setCollideWorldBounds(true);
        this.p1.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);

        //add monster
        this.foe1 = this.physics.add.sprite(centerX*3,100,'monster_atlas','monster0001');
        this.foe1.body.setAllowGravity(false);
        this.foe1.anims.play('monstermove');
        this.foe1.body.setSize(8,8);

        this.foe2 = this.physics.add.sprite(2000,2000,'monster_atlas','monster0001').setScale(2);
        this.foe2.body.setAllowGravity(false);
        this.foe2.anims.play('monstermove');
        this.foe2.body.setSize(16,16);

        //add coin
        this.coin1 = this.physics.add.sprite(centerX,centerY,'coin_atlas', 'coin0001').setScale(SCALE/1.5);
        this.coin1.body.setAllowGravity(false);
        this.coin1.anims.play('coinmove');

        //add sword
        this.sword1 = this.physics.add.sprite(1000,1000,'sword_atlas','sword0001');
        this.sword1.body.setAllowGravity(false);
        this.sword1.anims.play('swordmove');

        //add shield
        this.shield1 = this.physics.add.sprite(1000,1000,'shield_atlas','shield0001');
        this.shield1.body.setAllowGravity(false);
        this.shield1.anims.play('shieldmove');

        //add banana
        this.banana1 = this.physics.add.sprite(centerX*2, 550,'banana0001');
        this.banana1.body.setAllowGravity(false);
        this.banana1.body.setSize(8,8);
        this.banana1.anims.play('bananamove');

        //add up and dowm air wall
        this.upwall = this.physics.add.sprite(0,0);
        this.upwall.setSize(960,170);
        this.upwall.setImmovable(true);
        this.upwall.body.setAllowGravity(false);

        this.bottomwall = this.physics.add.sprite(0,600);
        this.bottomwall.setSize(960,60);
        this.bottomwall.setImmovable(true);
        this.bottomwall.body.setAllowGravity(false);

        this.score = 0;
        this.credit = 0;   //credit is for sword/shield appear
        //this.scoreText = this.add.text(quarterX/4, quarterY/4, "SPACE TO JUMP", scoreConfig);
        this.scoreText = this.add.bitmapText(quarterX/4, quarterY/4, 'gem', 'SPACE TO JUMP!', 30).setOrigin(0,0).setTint(0xa84632);
        //add physics collider
        this.physics.add.collider(this.p1,this.foe1, ()=>{
            if (haveSword){
                //this.p1.anims.play('attack');
                this.sound.play('destory');
                this.score += 20;
                //reset
                this.foe1.x = centerX*3;
                this.foe1.x = game.config.width;
                if (Math.round(Math.random()) == 0){
                    this.foe1.y = centerY - quarterY/4;
                }else{
                    this.foe1.y = 100;
                }
                this.scoreText.text = this.score;
            }else if(haveShield){
                //reset
              
                this.foe1.x = centerX*3;
                this.foe1.x = game.config.width;
                if (Math.round(Math.random()) == 0){
                    this.foe1.y = centerY - quarterY/4;
                }else{
                    this.foe1.y = 100;
                }
            }else{
                this.sound.play('destory');
                this.playerVelocity = 0;
                this.enemyVelocity = 0;
                this.rewardVelocity1 = 0;
                this.rewardVelocity2 = 0;
                this.JUMP_VELOCITY = 0;
                this.foe1.x = centerX*3;
                if (this.score>highscore){
                    highscore = this.score;
                }
                this.scene.start('overScene');
            }

        },null, this);

        this.physics.add.collider(this.p1,this.foe2, ()=>{
            if (haveSword){
                this.sound.play('destory');
                this.score += 30;
                //reset
                this.foe2.x = centerX*6;
                this.foe1.x = game.config.width;
                if (Math.round(Math.random()) == 0){
                    this.foe2.y = centerY - quarterY/4;
                }else{
                    this.foe2.y = 100;
                }
                this.scoreText.text = this.score;
            }else if(haveShield){
                //reset
                this.foe2.x = centerX*6;
                if (Math.round(Math.random()) == 0){
                    this.foe2.y = centerY - quarterY/4;
                }else{
                    this.foe2.y = 100;
                }
            }else{
                this.sound.play('destory');
                this.playerVelocity = 0;
                this.enemyVelocity = 0;
                this.rewardVelocity1 = 0;
                this.rewardVelocity2 = 0;
                this.JUMP_VELOCITY = 0;
                this.foe2.x = centerX*3;
                if (this.score>highscore){
                    highscore = this.score;
                }

                this.scene.start('overScene');
            }

        },null, this);

        this.physics.add.collider(this.p1,this.coin1, ()=>{
            this.sound.play('eatcoin');
            this.score += 10;
            this.credit += 10;
            this.scoreText.text = this.score;
            //reset
            this.coin1.x = game.config.width;
            if (Math.round(Math.random()) == 0){
                this.coin1.y = quarterY - quarterY/4;
            }else{
                this.coin1.y = 550;
            }
        },null, this);


        this.physics.add.collider(this.p1,this.sword1,()=>{
            this.sound.play('getsword');
            haveSword = true;
        },null, this);

        this.physics.add.collider(this.p1,this.shield1,()=>{
            this.sound.play('getsword');
            haveShield = true;
        },null, this);

        this.physics.add.collider(this.p1,this.banana1,()=>{
            if (haveShield){
                //reset the position of banana
                this.sound.play('steponbanana');
                this.banana1.x = centerX*3;
            }else{
                this.sound.play('steponbanana');
                this.playerVelocity = 0;
                this.enemyVelocity = 0;
                this.rewardVelocity1 = 0;
                this.rewardVelocity2 = 0;
                this.JUMP_VELOCITY = 0;
                this.banana1.x = centerX*3;
                if (this.score>highscore){
                    highscore = this.score;
                }
                this.scene.start('overScene');
            }

        },null,this);

        this.physics.add.collider(this.p1,[this.upwall,this.bottomwall]);





        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

    }

    update() {

        this.bg.tilePositionX += this.playerVelocity/100;
        this.bg2.tilePositionX += this.playerVelocity/100;

        if (timerForBg >= 60*15) {
            timerForBg =0;
            if (this.bg.x ==2000){
                this.bg2.x = 2000;
                this.bg.x = 0;
                this.bg.y = 0;
            }else{
                this.bg.x = 2000;
            this.bg2.x = 0;
            this.bg2.y = 0;
            }

        }else{
            timerForBg +=1;
        }


        if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.createCursorKeys().space)&&jumpn<=1) {
            this.p1.setVelocityY(this.JUMP_VELOCITY);
            this.p1.setVelocityX(0);
            jumpn+=1;
            this.p1.anims.play('jump',true);
        }

        if (this.p1.body.touching.down&& !haveShield&&!haveSword){
            jumpn=0;
            this.p1.anims.play('skate', true);
        }
        
        else if (this.p1.body.touching.down&&haveSword){
            swordMoving = false;
            this.sword1.x =game.config.width - quarterX;
            this.sword1.y = quarterY/4;
            this.sword1.setVelocityX(0);
            this.sword1.setVelocityY(0);
            this.p1.anims.play('skatingwithSword', true);
            timer+=1;
            jumpn=0;
        }

        else if (this.p1.body.touching.down&&haveShield){
            shieldMoving = false;
            this.shield1.x = game.config.width - quarterX;
            this.shield1.y = quarterY/4;
            this.shield1.setVelocityX(0);
            this.shield1.setVelocityY(0);
            this.p1.anims.play('skatingwithShield', true);
            timer+=1;
            jumpn=0;
        }
        


        this.banana1.x+=-this.playerVelocity/100;
        this.banana1.setVelocityY(0);
        if (this.banana1.x <=0 - 500){
             this.banana1.x = game.config.width;
         }

        this.foe1.setVelocityX(-this.enemyVelocity);
        this.foe1.setVelocityY(0);
        if (this.foe1.x <= 0 - 500) {
            //reset
            this.foe1.x = game.config.width;
             if (Math.round(Math.random()) == 0){
                this.foe1.y = centerY - quarterY/4;
            }else{
                this.foe1.y = 100;
            }
            //this.foe1.y = this.p1.y;
        }

        if (this.score >= 100 && this.score <300){
            this.foe2.setVelocityX(-this.enemyVelocity * 1);
            this.foe2.setVelocityY(0);
            if (this.foe2.x <= 0 - 1000) {
                //reset
                this.foe2.x = game.config.width;
             if (Math.round(Math.random()) == 0){
                this.foe2.y = centerY - quarterY/4;
            }else{
                this.foe2.y = 100;
            }
                //this.foe2.y = this.p1.y;
            }
        }else if(this.score >= 300){
            this.foe2.setVelocityX(-this.enemyVelocity * 2);
            this.foe2.setVelocityY(0);
            if (this.foe2.x <= 0 - 1000) {
                //reset
                this.foe2.x = game.config.width;
                // if (Math.round(Math.random()) == 0){
                //     this.foe1.y = centerY - quarterY/4;
                // }else{
                //     this.foe1.y = centerY + quarterY - quarterY/4;
                // }
                //this.foe2.y = this.p1.y;
                if (Math.round(Math.random()) == 0){
                    this.foe2.y = centerY - quarterY/4;
                }else{
                    this.foe2.y = 100;
                }
            }


        }


        this.coin1.setVelocityX(-this.rewardVelocity1);
        this.coin1.setVelocityY(0);
        if (this.coin1.x <= 0 - 64) {
            //reset
            this.coin1.x = game.config.width;
            if (Math.round(Math.random()) == 0){
                this.coin1.y = quarterY - quarterY/4;
            }else{
                this.coin1.y = 550;
            }
        }


        //make sword/shield appear if score larger than 50
        if (this.credit > 60 && !swordMoving && !haveSword && !shieldMoving && !haveShield) {
            this.credit = 0;
            if (Math.round(Math.random()) == 0 ){
                this.sword1.x = game.config.width;
                this.sword1.y = centerY;
                swordMoving = true;
            }else{
                this.shield1.x = game.config.width;
                this.shield1.y = centerY;
                shieldMoving = true;
            }
            //increase velocity
            this.playerVelocity = this.playerVelocity*1.1;
            this.enemyVelocity =  this.enemyVelocity*1.1;
            this.rewardVelocity1 = this.rewardVelocity1*1.1;
            //this.rewardVelocity2 = this.rewardVelocity2*1.1;
        }

        if (swordMoving == true){
            this.sword1.setVelocityX(-this.rewardVelocity2);
            this.sword1.setVelocityY(0);
            if (this.sword1.x <= 0 - 64){
                swordMoving = false;
            }
        }

        if (shieldMoving == true){
            this.shield1.setVelocityX(-this.rewardVelocity2);
            this.shield1.setVelocityY(0);
            if (this.shield1.x <= 0 - 64){
                shieldMoving = false;
            }
        }



        if (timer >=60*13){
            haveSword = false;
            this.sword1.x = 1000;
            this.sword1.y = 1000;
            haveShield = false;
            this.shield1.x = 1000;
            this.shield1.y = 1000;
            timer = 0;
        }else if (timer >= 60*10){
            this.scoreText.text = "Attention";
        }





    }

    reset(){

    }




}
