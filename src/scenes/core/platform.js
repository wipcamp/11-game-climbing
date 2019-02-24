import 'phaser';
import Responsive from './responsive'
import Player from './player'
import { last } from 'rxjs/operator/last';

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
let topScore
let lastScore = 0
let bg
let bg2


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

        bg = phasers.physics.add.sprite(respon.getPositionX(), phasers.scene.manager.game.config.height-200*scale-384*scale,'bgbamboo').setScale(1.5*scale)
        bg2 = phasers.physics.add.sprite(respon.getPositionX(), bg.y-1152*scale,'bgbamboo').setScale(1.5*scale)
    
        player = new Player({scene:phasers,})

        
        
        random = Math.random() * 10;

        platform1 = phasers.physics.add.sprite(respon.getPositionX(), 1202, 'platform').setScale(scale)
        platform2 = phasers.physics.add.sprite(respon.getPositionX(), 3606, 'platform').setScale(scale)



        obstracle1 = phasers.physics.add.image(platform1.x + 50 * scale, 100, 'obstracle');
        obstracle1.setScale(0.05 * scale);

        obstracle2 = phasers.physics.add.image(platform1.x - 50 * scale, obstracle1.y + 100 * random, 'obstracle2');
        obstracle2.setScale(0.05 * scale);



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
            bg.setVelocityY(400/4)
            bg2.setVelocityY(400/4)
            obstracle1.setVelocityY(400)
            obstracle2.setVelocityY(400)
            if (num > 0) {
                score += 10;
                scoreText.setText('Score: ' + score);
                if (score >= 1000) {
                    platform1.setVelocityY(speed);
                    platform2.setVelocityY(speed);
                    bg.setVelocityY(speed/4);
                    bg2.setVelocityY(speed/4);
                    obstracle1.setVelocityY(speed)
                    obstracle2.setVelocityY(speed)
                    if (platform1.y >= 0) {
                        platform1.y = -1202;
                        platform2.y = 1202;
                    }

                }
            }
        });

        scoreText = phasers.add.text(16, 16, 'score: 0', { fontSize: 30*scale, fill: '#372f2d' });
        //scoreText.setScale(scale)
        cursors = phasers.input.keyboard.createCursorKeys();

        topScore = phasers.add.text(respon.getPositionX() * 2 - 300 * scale, 16, 'topScore:', { fontSize: 30*scale, fill: '#372f2d' });
        //topScore.setScale(scale)
    }

    gameOver() {
        lastScore = score
        num = 0;
        num -= 10;
        obstracle1.setAngle(0);
        platform1.setVelocityY(0)
        platform2.setVelocityY(0)
        bg.setVelocityY(0)
        bg2.setVelocityY(0)
        obstracle1.setVelocityY(0)
        obstracle2.setVelocityY(0)
    }

    getLastScore() {
        return lastScore;
    }

    offTopscore() {
        topScore.setVisible(false)
    }

    onTopscore() {
        topScore.setVisible(true)
    }

    getObstracle1() {
        return obstracle1;
    }

    getObstracle2() {
        return obstracle2;
    }

    getPlayerPosition() {
        return platform1.x;
    }

    restart() {
        console.log('repl')
        num = 0;
        num += 1;
        count = 0;

        platform1.y = 1202;
        platform2.y = 3606;

        bg.y = phasers.scene.manager.game.config.height-200*scale-384*scale;
        bg2.y = bg.y-1152*scale;

        obstracle1.y = -1000;
        obstracle2.y = -1000;
        platform1.setVelocityY(400)
        platform2.setVelocityY(400)
        obstracle1.setVelocityY(400)
        obstracle2.setVelocityY(400)
        bg.setVelocityY(400/4)
        bg2.setVelocityY(400/4)

        random = Math.random() * 10;

        score = 0;

        
    }

    update() {

       console.log(random)


        if (random < 6) {
            obstracle1.x = platform1.x + 50 * scale;
            obstracle2.x = platform1.x - 50 * scale;
            obstracle2.y = obstracle1.y - 100 * random * scale - 200 * scale
        }
        /*else if (random >= 4 && random < 7) {
            obstracle2.y = obstracle1.y - 100 * random * scale - 200 * scale;
            obstracle2.x = platform1.x - 50 * scale;
            if (obstracle2.y >= phasers.scene.manager.game.config.height) {
                obstracle1.x = phasers.scene.manager.game.config.height
                obstracle2.y = obstracle1.y-100*scale*random-200*scale;
            }

        }*/
        else {
            obstracle2.x = platform1.x - 50 * scale;
            obstracle1.y = obstracle2.y - 100 * random * scale - 200 * scale;
            if (obstracle2.y >= phasers.scene.manager.game.config.height) {
                obstracle2.x = phasers.scene.manager.game.config.height
                obstracle1.y = obstracle1.y - 100 * random * scale - 200 * scale;

            }
        }

        if (cursors.left.isDown || cursors.right.isDown) {

            platform1.setVelocityY(400);
            platform2.setVelocityY(400);
            bg.setVelocityY(400/4);
            bg2.setVelocityY(400/4);
            obstracle1.setVelocityY(400)
            obstracle2.setVelocityY(400)
            num += 1;
            if (num > 0) {
                score += 1;
                scoreText.setText('Score: ' + score);
                if (score >= 100) {
                    platform1.setVelocityY(speed);
                    platform2.setVelocityY(speed);
                    bg.setVelocityY(speed/4);
                    bg2.setVelocityY(speed/4);
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

            score += 1;
            scoreText.setText('Score: ' + score);
            if (score >= 100) {
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

        if(bg.y>=phasers.scene.manager.game.config.height+584*scale){
            bg.y = bg2.y-1152*scale
        }

        if(bg2.y>=phasers.scene.manager.game.config.height+584*scale){
            bg2.y = bg.y-1152*scale
        }


        if (score >= 100 + (count * 100)) {
            count += 1
            speed = 500 + (count * 10)
        }

        if (obstracle1.y >= phasers.scene.manager.game.config.height + 100 && obstracle2.y >= phasers.scene.manager.game.config.height + 100) {
            random = Math.random() * 10;
            obstracle1.y = -100 * scale - random * 100 * scale;
        }

        lastScore = score;




    }
}

export default GameScene;