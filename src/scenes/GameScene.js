import Player from './core/player'

let player
class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }


    preload() {
        this.load.image('player', '../src/image/ninja.jpg');
        this.load.image('button', '../src/image/button.png');
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
