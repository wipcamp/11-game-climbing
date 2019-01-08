import Player from './core/player'
import platform from './core/platform'

let platforms
let player
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
        this.load.image('player', '../src/image/ninja.jpg');
        this.load.image('button', '../src/image/button.png');
    }

    create() {
        player = new Player({ scene: this, })
        player.create()

        platforms = new platform({scene:this,})
        platforms.create()

        document.fullscreenElement
    }

    update() {
        player.update()
        platforms.update()
    }
}

export default GameScene;
