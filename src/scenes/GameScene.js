import Player from './core/player'
import Responsive from './core/responsive'

let player
let obstracle
let bgsound
let loop
let bg
let bgSound
let howto
let bghowto
let respon
let scale

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }


     preload() {

        this.load.image('bg','../src/image/bg.png')

        this.load.image('howto','../src/image/howto.png')

        this.load.image('bghowto','../src/image/bghowto.png')

        this.load.image('bgbamboo','../src/image/bgbamboo.png')

        this.load.audio('bgSound','../src/image/bgsound.mp3', 
            {
                mute: false,
                volume: 1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay: 0
            }
        );
        
        this.load.audio('foot1','../src/image/foot1.mp3', 
            {
                mute: false,
                volume: 1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
            }
        );

        this.load.audio('foot2','../src/image/foot2.mp3', 
            {
                mute: false,
                volume: 1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
            }
        );

        this.load.audio('died','../src/image/die.mp3', 
            {
                mute: false,
                volume: 1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
            }
        );

         this.load.spritesheet('platform', '../src/image/tonpai.png', {
             frameWidth: 10200,
             frameHeight: 250,
           });

         this.load.spritesheet('player', '../src/image/run.png', {
             frameWidth: 1102,
             frameHeight: 1602,
         });

        this.load.image('button', '../src/image/button.png');

         this.load.image('obstracle', '../src/image/king.png')

         this.load.image('obstracle2', '../src/image/king2.png')

         this.load.image('gamecenter', '../src/image/gamecenter.png')

         this.load.image('gameoverbg', '../src/image/gameoverbg.png')

         this.load.image('gameover', '../src/image/gameover.png')

         this.load.image('share', '../src/image/fbShare1.png')

         this.load.image('leaderbg', '../src/image/leaderbg.png')

         this.load.image('leader', '../src/image/leader.png')

         this.load.image('first', '../src/image/1.png')

         this.load.image('second', '../src/image/2.png')

         this.load.image('third', '../src/image/3.png')

         this.load.image('close', '../src/image/close.png')

         this.load.spritesheet('retry', '../src/image/retry.png', {
             frameWidth: 185,
             frameHeight: 164,
         });

         this.load.image('gameover','../src/image/gameover.jpg')
     }

    create() {

        let respon =new Responsive()
        respon.check(window.screen.height-20/100*window.screen.height, window.screen.width)
        scale = respon.getScale();

        
        bg = this.physics.add.staticImage(this.scene.manager.game.config.width/2,this.scene.manager.game.config.height/2,'bg').setScale(2)

        
        

        player = new Player({ scene: this, })
        player.create()

        document.fullscreenElement

        bgsound = this.sound.add('bgSound',{
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        bgsound.play();

        

        
        bghowto = this.physics.add.staticImage(this.scene.manager.game.config.width/2,this.scene.manager.game.config.height/2,'bghowto').setScale(2).setInteractive()
        howto = this.physics.add.staticImage(this.scene.manager.game.config.width/2,this.scene.manager.game.config.height/2,'howto').setScale(scale)
        bghowto.on ('pointerup', () => { 
            howto.setVisible(false)
            bghowto.setVisible(false)
        });
    }

    update() {
        player.update()
    }
}

export default GameScene;
