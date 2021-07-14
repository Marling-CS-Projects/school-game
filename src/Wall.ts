import { Bodies } from "matter-js";
import { Sprite } from "pixi.js";
import GameObject from "./GameObject";
import * as Matter from 'matter-js'

export class Wall extends GameObject {
    constructor(x: number, y: number) {
        const sprite = Sprite.from('')
        super(sprite, Bodies.rectangle(x, y, 1920 , 540, { isStatic: true}))
    }

    gameloop(){ }

}