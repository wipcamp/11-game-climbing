import 'phaser';
import GameScene from './scenes/GameScene';

const config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: window.screen.width,
    height: window.screen.height-200,
    setBackgroundColor: 'black',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        GameScene
    ]
};

let interval = setInterval(() => {
    if (window.screen.height > 420 && window.screen.height < 768) {
        clearInterval(interval)
        config.width = window.screen.width
        config.height = window.screen.height-20/100*window.screen.height
        const game = new Phaser.Game(config);
    } if (window.screen.height >= 800) {
        clearInterval(interval)
        config.width = window.screen.width
        config.height = window.screen.height-20/100*window.screen.height
        const game = new Phaser.Game(config);
    }
}, 1000);


