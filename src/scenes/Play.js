class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload() {
        
        this.load.image('player','assets/player.png');
        this.load.image('foe','assets/foe.png');
        this.load.image('coin','assets/coin.png');
        this.load.image('sword','assets/sword.png');
        this.load.image('shield','assets/shield.png');
        this.load.image('banana','assets/banana.png');

        //load background
        this.load.image('sea','assets/sea_bg.png');
        this.load.image('forest','assets/forest_bg.png');

    }

    create() {
        let titleSnap = this.add.image(centerX, centerY, 'titlesnapshot').setOrigin(0.5);
        this.tweens.add({
            targets: titleSnap,
            duration: 4500,
            alpha: { from: 1, to: 0 },
            scale: { from: 1, to: 0 },
            repeat: 0
        });

        //define constants of physics
        this.playerVelocity = 300;
        this.enemyVelocity = 350;
        this.rewardVelocity1 = 400;
        this.rewardVelocity2 = 500;

        //Place background
        this.bg = this.add.tileSprite(0, 0,960,640,'sea').setOrigin(0,0);
        this.bg2 = this.add.tileSprite(2000,2000,960,640,'forest').setOrigin(0,0);
        
        //add player
        this.p1 = this.physics.add.sprite(0,centerY,'player').setScale(0.5);
        this.p1.setCollideWorldBounds(true);

        //add foe
        this.foe1 = this.physics.add.sprite(centerX*3,game.config.height- quarterY/4,'foe').setScale(0.5);
        this.foe1.body.setSize(32,32);

        this.foe2 = this.physics.add.sprite(centerX*3,game.config.height- quarterY/4,'foe');
        this.foe2.body.setSize(64,64);

        //add coin
        this.coin1 = this.physics.add.sprite(centerX,centerY,'coin_atlas', 'coin0001').setScale(2);
        this.coin1.anims.play('coinmove');

        //add sword
        this.sword1 = this.physics.add.sprite(1000,1000,'sword');
        this.sword1.anims.play('swordmove');

        //add shield
        this.shield1 = this.physics.add.sprite(1000,1000,'shield');
        this.shield1.anims.play('shieldmove');

        //add banana
        this.banana1 = this.physics.add.sprite(centerX*2, 550,'banana_atlas', 'banana0001');
        this.banana1.body.setSize(16,16);
        //this.banana1.anims.play('bananamove');

        //add up and dowm air wall
        this.upwall = this.physics.add.sprite(0,0);
        this.upwall.setSize(960,170);
        this.upwall.setImmovable(true);

        this.bottomwall = this.physics.add.sprite(0,600);
        this.bottomwall.setSize(960,60);
        this.bottomwall.setImmovable(true);

        //add scorer
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 160
          }
        this.score = 0;
        this.credit = 0;   //credit is for sword/shield appear
        this.scoreText = this.add.text(quarterX/4, quarterY/4, "SPACE TO JUMP", scoreConfig);

        //add physics collider
        this.physics.add.collider(this.p1,this.foe1, ()=>{
            if (haveSword){
                this.score += 20;
                //reset
                this.foe1.x = centerX*3;
                this.foe1.y = this.p1.y;
                this.scoreText.text = this.score;
            }else if(haveShield){
                //reset
                this.foe1.x = centerX*3;
                this.foe1.y = this.p1.y;
            }else{
                this.playerVelocity = 0;
                this.enemyVelocity = 0;
                this.rewardVelocity1 = 0;
                this.rewardVelocity2 = 0;
                this.gameoverText = this.add.text(quarterX/4, quarterY, "GAME OVER", scoreConfig);
            }
            
        },null, this);

        this.physics.add.collider(this.p1,this.foe2, ()=>{
            if (haveSword){
                this.score += 20;
                //reset
                this.foe2.x = centerX*6;
                this.foe2.y = this.p1.y;
                this.scoreText.text = this.score;
            }else if(haveShield){
                //reset
                this.foe2.x = centerX*6;
                this.foe2.y = this.p1.y;
            }else{
                this.playerVelocity = 0;
                this.enemyVelocity = 0;
                this.rewardVelocity1 = 0;
                this.rewardVelocity2 = 0;
                this.gameoverText = this.add.text(quarterX/4, quarterY, "GAME OVER", scoreConfig);
            }
            
        },null, this);

        this.physics.add.collider(this.p1,this.coin1, ()=>{
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
            haveSword = true;
        },null, this);

        this.physics.add.collider(this.p1,this.shield1,()=>{
            haveShield = true;
        },null, this);

        this.physics.add.collider(this.p1,this.banana1,()=>{
            if (haveShield){
                //reset the position of banana
                this.banana1.x = centerX*3;
            }else{
                this.playerVelocity = 0;
                this.enemyVelocity = 0;
                this.rewardVelocity1 = 0;
                this.rewardVelocity2 = 0;
                this.gameoverText = this.add.text(quarterX/4, quarterY, "GAME OVER", scoreConfig);
            }
            
        },null,this);

        this.physics.add.collider(this.p1,[this.upwall,this.bottomwall]);

        
        
    
    }

    update() {

        this.bg.tilePositionX += this.playerVelocity/100;
        this.bg2.tilePositionX += this.playerVelocity/100;
        
        if (timerForBg >= 60*10) {
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

        
        if(this.input.keyboard.createCursorKeys().space.isDown) {
            this.p1.setVelocityY(-this.playerVelocity);
            this.p1.setVelocityX(0);
        } else{
            this.p1.setVelocityY(this.playerVelocity);
            this.p1.setVelocityX(0);
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
            // if (Math.round(Math.random()) == 0){
            //     this.foe1.y = centerY - quarterY/4;
            // }else{
            //     this.foe1.y = centerY + quarterY - quarterY/4;
            // }
            this.foe1.y = this.p1.y;
        }

        if (this.score >= 300 && this.score <600){
            this.foe2.setVelocityX(-this.enemyVelocity * 1);
            this.foe2.setVelocityY(0);
            if (this.foe2.x <= 0 - 1000) {
                //reset
                this.foe2.x = game.config.width;
                // if (Math.round(Math.random()) == 0){
                //     this.foe1.y = centerY - quarterY/4;
                // }else{
                //     this.foe1.y = centerY + quarterY - quarterY/4;
                // }
                this.foe2.y = this.p1.y;
            }
        }else if(this.score >= 600){
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
                this.foe2.y = this.p1.y;
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
        if (this.credit > 100 && !swordMoving && !haveSword && !shieldMoving && !haveShield) {
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
            this.rewardVelocity2 = this.rewardVelocity2*1.1;
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

        if (haveSword){
            swordMoving = false;
            this.sword1.x = game.config.width - quarterX;
            this.sword1.y = quarterY/4;
            this.sword1.setVelocityX(0);
            this.sword1.setVelocityY(0);
            timer+=1;
        }

        if (haveShield){
            shieldMoving = false;
            this.shield1.x = game.config.width - quarterX;
            this.shield1.y = quarterY/4;
            this.shield1.setVelocityX(0);
            this.shield1.setVelocityY(0);
            timer+=1;
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
