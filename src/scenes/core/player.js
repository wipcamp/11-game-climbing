import 'phaser';
import Platform from './platform'
import PopUp from './popUpRetry'
import Responsive from './responsive'

let phasers
let leftzone
let rightzone
let player
let player1
let player2
let button
let cursors
let platform
let gameover = false;
let click = true;
let popUp
let jump = false
let foot1
let foot2
let colider1
let colider2
let respon
let scale


class GameScene extends Phaser.Scene {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.scene.add.existing(this);
        phasers = config.scene
    }

    preload(){
        this.load.image('button', '../src/image/button.png');

        this.load.audio('foot1', '../src/image/foot1.mp3')
        this.load.audio('foot2', '../src/image/foot2.mp3')
    }


    create() {

        respon = new Responsive()
        respon.check(phasers.scene.manager.game.config.height-200*scale, phasers.scene.manager.game.config.width)

        foot1 = phasers.sound.add('foot1')
        foot2 = phasers.sound.add('foot2')

        platform = new Platform({scene:phasers,})
        platform.create();

        player = phasers.physics.add.sprite(platform.getPlayerPosition()-50, phasers.scene.manager.game.config.height-50, 'player').setScale(2);
        player1 = phasers.physics.add.sprite(platform.getPlayerPosition()+50, phasers.scene.manager.game.config.height-50, 'player')
        button = phasers.physics.add.sprite(0,0,'button').setVisible(false);
        player1.setVisible(false);
        player1.setActive(false);
        player1.setScale(2);

        leftzone = phasers.add.zone(0, 0, 200, 240).setOrigin(0).setName('left').setInteractive();
        rightzone = phasers.add.zone(200, 0, 200, 240).setOrigin(0).setName('right').setInteractive();

        phasers.anims.create({
            key: 'run',
            frames: phasers.anims.generateFrameNumbers('player', { start: 1, end: 2 }),
            frameRate: 50,
            repeat: -1,
          });

        phasers.input.on('gameobjectdown', function (pointer) {
            button.x = pointer.x;   
            player.setVisible(false);
            player.setActive(false);
        });

        colider1 = phasers.physics.add.overlap(platform.getObstracle1(),player1,hit)
        colider2 = phasers.physics.add.overlap(platform.getObstracle2(),player1,hit)

        popUp = new PopUp({scene:phasers,})
        popUp.create();

            cursors = phasers.input.keyboard.createCursorKeys();
            player1.anims.play('run')
        
    }

    restart(){
        popUp.getPopUp().setVisible(false);
        popUp.getRetry().setVisible(false);
        gameover = false;
        click = true;
    }

    


    update() {

        platform.update();

        if(gameover == true){
            button.x = 0;
            click = false;
            platform.gameOver();
            popUp.gameOver();
        }
        
        if((button.x<200 && button.x != 0) ||cursors.left.isDown&&click ==true ){
            player1.setVisible(true);
            player1.setActive(true)
            player.setVisible(false);
            player.setActive(false);
            player1.x = platform.getPlayerPosition()-50;
            button.x = 150;       
        }
         if((button.x>=200 && button.x != 0)||cursors.right.isDown&& click == true){
            player1.setVisible(true);
            player1.setActive(true)
            player.setVisible(false);
            player.setActive(false);
            player1.x = platform.getPlayerPosition()+50;
            button.x = 225;
        }

        
    }
}

function hit(){
    console.log('hit')
    gameover = true;
}

export default GameScene;