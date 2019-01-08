import 'phaser';
let phasers
let leftzone
let rightzone
let player
let player1
let player2
let button
let cursors
class GameScene extends Phaser.Scene {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.scene.add.existing(this);
        phasers = config.scene
    }

    preload(){
        this.load.image('button', '../src/image/button.png');
    }


    create() {

        player = phasers.physics.add.sprite(150, 120, 'player').setScale(2);
        player1 = phasers.physics.add.sprite(150, 120, 'player')
        player2 = phasers.physics.add.sprite(225, 120, 'player')
        button = phasers.physics.add.sprite(0,0,'button').setVisible(false);
        player1.setVisible(false);
        player2.setVisible(false);
        player1.setScale(2);
        player2.setScale(2);

        leftzone = phasers.add.zone(0, 0, 200, 240).setOrigin(0).setName('left').setInteractive();
        rightzone = phasers.add.zone(200, 0, 200, 240).setOrigin(0).setName('right').setInteractive();
        console.log(leftzone)
        console.log(rightzone)

        phasers.anims.create({
            key: 'run',
            frames: phasers.anims.generateFrameNumbers('player', { start: 1, end: 2 }),
            frameRate: 50,
            repeat: -1,
          });

        phasers.input.on('gameobjectdown', function (pointer) {
            button.x = pointer.x;   
            player.setVisible(false);
        });

        

        cursors = phasers.input.keyboard.createCursorKeys();
        player1.anims.play('run')
        player2.anims.play('run')
    }


    update() {
        console.log(player1.x)
        if((button.x<200 && button.x != 0) ||cursors.left.isDown ){
            player2.setVisible(false);
            player2.setActive(false)
            player1.setVisible(true);
            player1.setActive(true)
            player.setVisible(false);
            button.x = 150;
        }
         if((button.x>=200 && button.x != 0)||cursors.right.isDown){
            player2.setVisible(true);
            player2.setActive(true)
            player1.setVisible(false);
            player1.setActive(false)
            player.setVisible(false);
            button.x = 225;
            
        }
        else{
            
        }
        
    }
}

export default GameScene;