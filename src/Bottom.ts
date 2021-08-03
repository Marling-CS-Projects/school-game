import { Bodies } from "matter-js";
import { Sprite, Texture, TilingSprite } from "pixi.js";
import GameObject from "./GameObject";
import * as Matter from 'matter-js'

export class Bottom extends GameObject { //inherits the properties from gameObject, (maps PIXI to Matter)
    constructor(x: number, y: number) {
        const texture = Texture.from('assets/platform-block.png')
        let sprite = new TilingSprite(texture, Math.floor(Math.random() * (1000 - 100) + 100))
        super(sprite, Bodies.rectangle(x, y, sprite.width, sprite.height, {isStatic:true}))

        if (this.matterData.angle != 90){
            this.matterData.angle = 0; 
        }
    }

    
    gameloop(){}
}