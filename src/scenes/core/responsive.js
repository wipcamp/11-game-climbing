
let scale;
let sceneheight;
let scenewidth;

export default class responsive extends Phaser.Scene
{
    constructor ()
    {
        super();
    } 


    check (height, width)
    {
        sceneheight = height;
        scenewidth = width;
        if (scenewidth <= 450)
        {
            this.scale = 0.5;
        }
        else if (scenewidth <= 490)
        {
            this.scale = 0.6;
        }
        else if (scenewidth <= 580)
        {
            this.scale = 0.75;
        }
        else if (scenewidth <= 650)
        {
            this.scale = 0.75;
        }
        else if (scenewidth <= 680)
        {
            this.scale = 0.8;
        }
        else if (scenewidth <= 750)
        {
            this.scale = 0.85;
        }
        else if (scenewidth <= 850)
        {
            this.scale = 0.9;
        }
        else if (scenewidth <= 1300)
        {
            this.scale = 1; 
        }
        else
        {
            this.scale = 1;
        }
    }

    getScale ()
    {
        return this.scale;
    }
    getPositionY(){
        return sceneheight/2;
    }

    getPositionX(){
        return scenewidth/2;
    }

    getScenceWidth(){
        return scenewidth;
    }

    getScenceWidth(){
        return sceneheight;
    }
}