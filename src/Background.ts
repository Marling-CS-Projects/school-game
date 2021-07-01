import { Bodies } from "matter-js";
import { Sprite, TilingSprite } from "pixi.js";
import GameObject from "./GameObject";
import * as PIXI from 'pixi.js'
import * as Matter from 'matter-js'

export class Background extends GameObject {
    constructor(x: number, y: number) {
        let texture = PIXI.Texture.from('./assets/clouds.jpeg')
        let background = new PIXI.TilingSprite(texture, window.innerWidth-10, window.innerHeight-10)
        super(background, Bodies.rectangle(x, y, window.innerWidth-10, window.innerHeight-10))
    }

    gameloop(){}

}
