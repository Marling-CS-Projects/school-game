import { Bodies } from "matter-js";
import GameObject from "./GameObject";
import * as PIXI from 'pixi.js'
import * as Matter from 'matter-js'

export class Platform extends GameObject {
    constructor(x: number, y: number) {
        let texture = PIXI.Texture.from('./assets/Untitled-2.png')
        let fill = new PIXI.TilingSprite(texture, 1920, 20)
        super(fill, Bodies.rectangle(x, y, 1920  ,20 , {isStatic: true }))
    }

    gameloop(){}

}
