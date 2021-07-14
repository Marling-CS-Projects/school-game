import { Sprite, Texture, TilingSprite } from "pixi.js";
import GameObject from "./GameObject";
import { Bodies } from "matter-js";

export class Clouds extends GameObject{ 
    constructor(x: number, y: number){
            const texture = Texture.from('./assets/clouds.jpeg')
            let sprite = new TilingSprite(texture, 1, texture.height)
        super(sprite,  Bodies.rectangle(x, y, 1920, 1080))
    }
}