import { Bodies } from "matter-js";
import { Sprite } from "pixi.js";
import GameObject from "./GameObject";
import * as Matter from 'matter-js'

export class Base extends GameObject {
    constructor(x: number, y: number) {
        super(null, Bodies.rectangle(x, y, 800, 1, {isStatic : true}))
    }

    gameloop(){ }

}