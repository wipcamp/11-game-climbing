import Player from './core/player'


let player
let obstracle
let bgsound
let loop
class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }


    preload() {

        this.load.audio('bgsound', '../src/image/bgsound.mp3',{
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        })

        this.load.spritesheet('platform', '../src/image/tonpai.png', {
            frameWidth: 10200,
            frameHeight: 250,
          });
        this.load.spritesheet('player', '../src/image/run.png',{
            frameHeight : 16,
            frameWidth: 16,
        });
        this.load.image('button', '../src/image/button.png');

        this.load.image('obstracle', '../src/image/weapon.png')

        this.load.image('retry','../src/image/retry.png')

        this.load.image('gameover','../src/image/gameover.jpg')
    }

    create() {
        

        player = new Player({ scene: this, })
        player.create()

        document.fullscreenElement

        
        
    }

    update() {
        player.update()
    }
}

export default GameScene;
