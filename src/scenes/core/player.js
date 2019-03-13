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
let howto
let bghowto


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

        scale = respon.getScale();

        foot1 = phasers.sound.add('foot1')
        foot2 = phasers.sound.add('foot2')

        platform = new Platform({scene:phasers,})
        platform.create();

        player = phasers.physics.add.sprite(platform.getPlayerPosition()-50*scale, phasers.scene.manager.game.config.height-50*scale, 'player').setScale(0.045*scale).setAngle(-90);
        player1 = phasers.physics.add.sprite(platform.getPlayerPosition()+50*scale, phasers.scene.manager.game.config.height-50*scale, 'player1').setAngle(-90)
        button = phasers.physics.add.sprite(0,0,'button').setVisible(false);
        player1.setVisible(false);
        player1.setActive(false);
        player1.setScale(0.045*scale);

        phasers.anims.create({
            key: 'run',
            frames: phasers.anims.generateFrameNumbers('player', { start: 0, end: 1}),
            frameRate: 10,
            repeat: -1,
          });

          phasers.anims.create({
            key: 'run1',
            frames: phasers.anims.generateFrameNumbers('player', { start: 2, end: 3}),
            frameRate: 10,
            repeat: -1,
          });


        colider1 = phasers.physics.add.overlap(platform.getObstracle1(),player1,hit)
        colider2 = phasers.physics.add.overlap(platform.getObstracle2(),player1,hit)


            cursors = phasers.input.keyboard.createCursorKeys();

            foot1 = phasers.sound.add('foot1',{
                mute: false,
                volume: 4,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
            });
    
            foot2 = phasers.sound.add('foot2',{
                mute: false,
                volume: 4,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
            });

            bghowto = phasers.physics.add.staticImage(phasers.scene.manager.game.config.width/2,phasers.scene.manager.game.config.height/2,'bghowto').setScale(2)
            howto = phasers.physics.add.staticImage(phasers.scene.manager.game.config.width/2,phasers.scene.manager.game.config.height/2,'howto').setScale(scale)

            rightzone = phasers.add.zone(0, 0, respon.getPositionX()*2, phasers.scene.manager.game.config.height).setOrigin(0).setName('right').setInteractive()
            rightzone.on ('pointerdown', () => { 
            player1.anims.play('run1')
            player1.setVisible(true).setAngle(90);
            player1.setActive(true)
            player.setVisible(false);
            player.setActive(false);
            player1.x = platform.getPlayerPosition()+55*scale;
            button.x = phasers.scene.manager.game.config.width-100*scale;
            howto.setVisible(false)
            bghowto.setVisible(false)
            foot2.play()
        });

        
        leftzone = phasers.add.zone(0, 0, respon.getPositionX()-100*scale, phasers.scene.manager.game.config.height).setOrigin(0).setName('left').setInteractive()
        leftzone.on ('pointerdown', () => { 
            player1.anims.play('run')
            player1.setVisible(true).setAngle(-90);
            player1.setActive(true)
            player.setVisible(false);
            player.setActive(false);
            player1.x = platform.getPlayerPosition()-55*scale;
            button.x = 100; 
            howto.setVisible(false)
            bghowto.setVisible(false)
            foot1.play()
        });

        popUp = new PopUp({scene:phasers,})
        popUp.create();
        
    }

    restart(){
        popUp.getPopUp().setVisible(false);
        popUp.getRetry().setVisible(false);
        gameover = false;
        click = true;
    }

    setName(person){
        name=person
    }

    


    update() {

        popUp.update()

        platform.update();

        if(gameover == true){
            button.x = 0;
            click = false;
            platform.gameOver();
            popUp.gameOver();
        }
        
        if((button.x<phasers.scene.manager.game.config.width/2 && button.x != 0) ||cursors.left.isDown&&click ==true ){
            player1.setVisible(true).setAngle(-90);
            player1.setActive(true)
            player.setVisible(false);
            player.setActive(false);
            player1.x = platform.getPlayerPosition()-55*scale;
            button.x = 100;   
            
        }
         if((button.x>=phasers.scene.manager.game.config.width/2 && button.x != 0)||cursors.right.isDown&& click == true){
            player1.setVisible(true).setAngle(90);
            player1.setActive(true)
            player.setVisible(false);
            player.setActive(false);
            player1.x = platform.getPlayerPosition()+55*scale;
            button.x = phasers.scene.manager.game.config.width-100*scale;
            
        }

        if(cursors.left.isDown){
            player1.anims.play('run') 
            foot1.play()
        }
        if(cursors.right.isDown){
            player1.anims.play('run1') 
            foot2.play()
        }

        if(cursors.left.isDown || cursors.right.isDown){
            howto.setVisible(false)
            bghowto.setVisible(false)
        }
           

        
    }
}

function hit(){
    console.log('hit')
    gameover = true;
}

export default GameScene;