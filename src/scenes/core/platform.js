import 'phaser';
let phasers
let zone
let obstracle1;
let obstracle2;
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

        random = Math.random() * 10;

        obstracle1 = phasers.physics.add.image(215, 100, 'obstracle');
        obstracle1.setScale(0.03);
        
        obstracle2 = phasers.physics.add.image(215, 100, 'obstracle');
        obstracle2.setScale(0.05);


        platform1 = phasers.physics.add.sprite(200, 1202, 'platform');
        platform2 = phasers.physics.add.sprite(200, 3606, 'platform');

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
            obstracle2.setVelocityY(400)
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
        });

        scoreText = phasers.add.text(16, 16, 'score: 0', { fontSize: '10px', fill: '#FFFFFF' });

        cursors = phasers.input.keyboard.createCursorKeys();
    }

    update() {

        console.log(random)
        console.log(speed)

        rotate -= 10;
        obstracle1.setAngle(rotate);
        obstracle2.setAngle(rotate)

        if (random <= 5) {
            obstracle1.setVisible(true)
            obstracle1.x = 185;
            obstracle2.setVisible(false)
        }
        else {
            obstracle2.setVisible(true)
            obstracle2.x = 215;
            obstracle1.setVisible(false)
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
                    obstracle1.setVelocityY(speed)

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
                obstracle1.setVelocityY(speed)
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
            random = Math.random() * 10;
            if(obstracle1.y>=500){
                obstracle1.y = -100;
            }
            if(obstracle2.y>=500){
                obstracle2.y = -100;
            }
        }



    }
}

export default GameScene;