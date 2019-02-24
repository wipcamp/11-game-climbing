import 'phaser'
import Responsive from './responsive'
import axios from 'axios'
import Platform from './platform'

let platform
let phasers
let scale
let frontbg
let first
let second
let third
let bg
let close
let logo
let st
let nd
let rd
let die

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

        platform = new Platform({ scene: phasers, })

        die = phasers.sound.add('died',{
            mute: false,
            volume: 4,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });

        let respon =new Responsive()
        respon.check(window.screen.height-20/100*window.screen.height, window.screen.width)
        scale = respon.getScale();

        bg = phasers.add.image(respon.getPositionX(),respon.getPositionY(),'leaderbg').setVisible(false).setScale(scale)

        frontbg = phasers.add.image(respon.getPositionX(),respon.getPositionY()+50*scale,'leader').setScale(0.15*scale).setVisible(false)

        first = phasers.add.image(frontbg.x+200*scale,frontbg.y-72*scale,'first').setScale(0.15*scale).setVisible(false)

        second = phasers.add.image(frontbg.x+200*scale,frontbg.y,'second').setScale(0.15*scale).setVisible(false)

        third = phasers.add.image(frontbg.x+200*scale,frontbg.y+72*scale,'third').setScale(0.15*scale).setVisible(false)

        close = phasers.add.image(respon.getPositionX()*2-60*scale,40,'close').setScale(scale*0.15).setVisible(false)
        close.setInteractive();
  
        close.on('pointerup', () => { 
            bg.setVisible(false)
            frontbg.setVisible(false)
            first.setVisible(false)
            second.setVisible(false)
            third.setVisible(false)
            close.setVisible(false)
            logo.setVisible(false)
            st.setVisible(false)
            nd.setVisible(false)
            rd.setVisible(false)
            die.play()
            platform.onTopscore()
        });

        logo = phasers.add.image(frontbg.x,frontbg.y-172*scale,'leaderlogo').setScale(0.15*scale).setVisible(false)

        axios.get(`https://game.service.wip.camp/api/janpu3score`).then(res=>{
            console.log(`${res.data}`)
            st = phasers.add.text(frontbg.x-200*scale,frontbg.y-82*scale, `${res.data[0].player_name}:${res.data[0].score}`, { fontSize: 30*scale, fill: '#372f2d' });
            st.setScale(scale).setVisible(false)
    
            nd = phasers.add.text(frontbg.x-200*scale,frontbg.y-10*scale, `${res.data[1].player_name}:${res.data[1].score}`, { fontSize: 30*scale, fill: '#372f2d' });
            nd.setScale(scale).setVisible(false)
    
            rd = phasers.add.text(frontbg.x-200*scale,frontbg.y+57*scale, `${res.data[2].player_name}:${res.data[2].score}`, { fontSize: 30*scale, fill: '#372f2d' });
            rd.setScale(scale).setVisible(false)
        })
     

    }

    click(){
        bg.setVisible(true)
        frontbg.setVisible(true)
        first.setVisible(true)
        second.setVisible(true)
        third.setVisible(true)
        close.setVisible(true)
        logo.setVisible(true)
        st.setVisible(true)
        nd.setVisible(true)
        rd.setVisible(true)
    }

    update() {


    }
}



export default GameScene;