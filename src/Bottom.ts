import { Bodies } from "matter-js";
import { Sprite, Texture, TilingSprite } from "pixi.js";
import GameObject from "./GameObject";
import * as Matter from 'matter-js'

export class Floor extends GameObject { //inherits the properties from gameObject, (maps PIXI to Matter)
    constructor(x: number, y: number) {
        const texture = Texture.from('assets/floor.png')
        let sprite = new TilingSprite(texture, 10000)
        super(sprite, Bodies.rectangle(x, y, sprite.width, sprite.height, {isStatic:true}))

        if (this.matterData.angle != 90) { //attempt to prevent avatar from rotating. currently non-functional.
            this.matterData.angle = 0;
        }
    }

    gameloop(){}

    




}