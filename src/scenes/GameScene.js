import Player from './core/player'
import platform from './core/platform'
//import Obstracle from './core/obstracle'

let platforms
let player
let obstracle
class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }


    preload() {
        this.load.spritesheet('platform', '../src/image/ground.png', {
            frameWidth: 2404,
            frameHeight: 28,
          });
        this.load.spritesheet('player', '../src/image/run.png',{
            frameHeight : 16,
            frameWidth: 16,
        });
        this.load.image('button', '../src/image/button.png');

        this.load.image('obstracle', '../src/image/weapon.png')
    }

    create() {
        player = new Player({ scene: this, })
        player.create()

        platforms = new platform({scene:this,})
        platforms.create()

        //obstracle = new Obstracle({scene:this,})
        //obstracle.create()

        document.fullscreenElement
    }

    update() {
        player.update()
        platforms.update()
        //obstracle.update()
    }
}

export default GameScene;
