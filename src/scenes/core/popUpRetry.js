import 'phaser';
import Player from './player';
import Platform from './platform'
import { RefCountDisposable, CompositeDisposable } from 'rx';

let phasers
let popUp
let retry
let player
let platform
let count =0;


class GameScene extends Phaser.Scene {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.scene.add.existing(this);
        phasers = config.scene
    }

    preload() {
        
    }


    create() {

        popUp = phasers.physics.add.staticImage(200,120,'gameover').setVisible(false).setScale(0.5);
        retry = phasers.add.image(300,120,'retry').setVisible(false).setScale(0.05);
        retry.setInteractive(); 

        player = new Player({scene:phasers,});

        platform = new Platform({scene:phasers,});

    }

    gameOver(){
        popUp.setVisible(true);
        retry.setVisible(true);
        retry.on ('pointerup', () => { 
            player.restart();
            platform.restart();
            platform.update();
        });
    }


    getPopUp(){
        return popUp;
    }

    getRetry(){
        return retry;
    }

    update() {

    }
}



export default GameScene;