import 'phaser';
import Responsive from './responsive'
import Player from './player'

let phasers
let zone
let obstracle1;
let obstracle2
let platform1
let platform2
let cursors
let num = 0;
let score = 0;
let scoreText;
let speed = 0;
let count = 0;
let random
let rotate = 0
let scale
let player
let respon


class GameScene extends Phaser.Scene {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.scene.add.existing(this);
        phasers = config.scene
    }

    preload() {

    }


    create() {

        player = new Player({scene:phasers,})
        
        respon = new Responsive()
        respon.check(phasers.scene.manager.game.config.height-200*scale, phasers.scene.manager.game.config.width)

        scale = respon.getScale();
        
        random = Math.random() * 10;
        
        platform1 = phasers.physics.add.sprite(respon.getPositionX(), 1202, 'platform').setScale(1);
        platform2 = phasers.physics.add.sprite(respon.getPositionX(), 3606, 'platform').setScale(1);

        obstracle1 = phasers.physics.add.image(platform1.x+50, 100, 'obstracle');
        obstracle1.setScale(0.03);

        obstracle2 = phasers.physics.add.image(platform1.x-50, obstracle1.y+100*random, 'obstracle');
        obstracle2.setScale(0.03);

        

        platform1.setAngle(90)
        platform2.setAngle(90)

        platform1.setImmovable(true)
        platform2.setImmovable(true)

        platform1.body.allowGravity = false;
        platform2.body.allowGravity = false;

        zone = phasers.add.zone(0, 0, 1260, 560).setOrigin(0).setName('zone').setInteractive();

        phasers.input.on('gameobjectdown', function (pointer) {
            num += 1;
            platform1.setVelocityY(400)
            platform2.setVelocityY(400)
            obstracle1.setVelocityY(400)
            if (num > 0) {
                score += 10;
                scoreText.setText('Score: ' + score);
                if (score >= 1000) {
                    platform1.setVelocityY(speed);
                    platform2.setVelocityY(speed);
                    obstracle1.setVelocityY(speed)
                    if (platform1.y >= 0) {
                        platform1.y = -1202;
                        platform2.y = 1202;
                    }

                }
            }
        });

        scoreText = phasers.add.text(16, 16, 'score: 0', { fontSize: '10px', fill: '#FFFFFF' });

        cursors = phasers.input.keyboard.createCursorKeys();
    }

    gameOver(){
        num = 0;
        num -= 10;
        obstracle1.setAngle(0);
        platform1.setVelocityY(0)
        platform2.setVelocityY(0)
        obstracle1.setVelocityY(0)
        obstracle2.setVelocityY(0)
    }

    getObstracle1(){
        return obstracle1;
    }

    getObstracle2(){
        return obstracle2;
    }

    getPlayerPosition(){
        return platform1.x;
    }

    restart(){
        console.log('repl')
        num = 0;
        num +=1;
        count = 0;

        platform1.y = 1202;
        platform2.y = 3606;

        obstracle1.y = -1000;
        obstracle1.setAngle(rotate);
        obstracle2.y = -1000;
        obstracle2.setAngle(rotate);
        platform1.setVelocityY(400)
        platform2.setVelocityY(400)
        obstracle1.setVelocityY(400)
        obstracle2.setVelocityY(400)

        random = Math.random() * 10;

        score = 0;
    }

    update() {

        obstracle2.y = obstracle1.y-100*random-200

        rotate -= 10;
        obstracle1.setAngle(rotate);
        obstracle2.setAngle(rotate);

        if (random <= 5) {
            obstracle1.x = platform1.x+50;
            obstracle2.x = platform1.x-50;
        }
        else if (random > 5&&random <=7) {
            obstracle1.x = platform1.x+50;
            obstracle2.x = platform1.x+50;
        }
        else {
            obstracle2.x = platform1.x+50;
            obstracle1.x = platform1.x-50;

        }

        if (cursors.left.isDown || cursors.right.isDown) {

            platform1.setVelocityY(400);
            platform2.setVelocityY(400);
            obstracle1.setVelocityY(400)
            obstracle2.setVelocityY(400)
            num += 1;
            if (num > 0) {
                score += 10;
                scoreText.setText('Score: ' + score);
                if (score >= 1000) {
                    platform1.setVelocityY(speed);
                    platform2.setVelocityY(speed);
                    obstracle1.setVelocityY(speed)
                    obstracle2.setVelocityY(speed)

                    if (platform1.y >= 0) {
                        platform1.y = -1202;
                        platform2.y = 1202;
                    }

                }
            }
        }

        else if (num > 0) {

            score += 10;
            scoreText.setText('Score: ' + score);
            if (score >= 1000) {
                platform1.setVelocityY(speed);
                platform2.setVelocityY(speed);
                obstracle1.setVelocityY(speed)
                obstracle2.setVelocityY(speed)
                if (platform1.y >= 0) {
                    platform1.y = -1202;
                    platform2.y = 1202;
                }

            }
        }

        if (platform1.y >= 0) {
            platform1.y = -1202;
            platform2.y = 1202;
        }


        if (score >= 1000 + (count * 1000)) {
            count += 1
            speed = 400 + (count * 10)
        }

        if(obstracle1.y>=phasers.scene.manager.game.config.height&&obstracle2.y>=phasers.scene.manager.game.config.height){
            random = Math.random() * 10;
            obstracle1.y = -100 -random*100;
            //obstracle2.y = obstracle1.y-100*random
        }

        console.log(phasers.scene.manager.game.config.height)



    }
}

export default GameScene;