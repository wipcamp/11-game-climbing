import 'phaser';
let phasers
let leftzone
let rightzone
let player
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
        player = phasers.physics.add.sprite(150, 120, 'player')
        button = phasers.physics.add.sprite(0,0,'button').setVisible(false);
        player.setScale(0.05);

        leftzone = phasers.add.zone(0, 0, 200, 240).setOrigin(0).setName('left').setInteractive();
        rightzone = phasers.add.zone(200, 0, 200, 240).setOrigin(0).setName('right').setInteractive();
        console.log(leftzone)
        console.log(rightzone)

        phasers.input.on('gameobjectdown', function (pointer) {

            button.x = pointer.x;
            button.y = pointer.y;
    
        });
        
    }


    update() {
        if(button.x<200){
            player.x = 150;
        }
        else{
            player.x = 225;
        }
    }
}

export default GameScene;