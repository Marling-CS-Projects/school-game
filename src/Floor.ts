import { Bodies } from "matter-js";
import { Sprite, Texture, TilingSprite } from "pixi.js";
import GameObject from "./GameObject";
import * as Matter from 'matter-js';
import { app } from "./index";

export class Border extends GameObject {//inherits the properties from gameObject, (maps PIXI to Matter)

    collisionData: Matter.Body // matter only accepts bodies

    constructor(x: number, y: number) {
        const texture = Texture.from('assets/platform-block.png')
        let spriteWidth = app.view.height
        let sprite = new TilingSprite(texture, spriteWidth) //creates randomly sized platform sprites.
        super(sprite, Bodies.rectangle(x, y, 1080, 0.001, {isStatic:true}))
        if (this.matterData.angle != 90){
            this.matterData.angle = 0; 
        }

        
    }

    
    gameloop(){}
};