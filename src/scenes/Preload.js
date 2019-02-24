let ready = false;

class Preload extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'Preload'
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
        ready = true;
    }
    create(){
        this.scene.start('GameScene')
    }

}

export default Preload;
