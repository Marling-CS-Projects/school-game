import { Bodies } from "matter-js";
import { Sprite, Texture, TilingSprite } from "pixi.js";
import GameObject from "./GameObject";
import * as Matter from 'matter-js'

export class Bottom extends GameObject { //inherits the properties from gameObject, (maps PIXI to Matter)
    constructor(x: number, y: number) {
        const texture = Texture.from('assets/platform-block.png')
        let spriteWidth = Math.floor(Math.random() * (1000 - 100) + 100)
        let sprite = new TilingSprite(texture, spriteWidth) //creates randomly sized platform sprites.
        let collisonBody = Bodies.rectangle(x-spriteWidth, y, 0.000001, sprite.height, {isStatic: true})
        super(sprite, Bodies.rectangle(x, y, sprite.width, sprite.height, {isStatic:true}), collisonBody)
        if (this.matterData.angle != 90){
            this.matterData.angle = 0; 
        }
    }

    
    gameloop(){}
}