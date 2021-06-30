import { Bodies } from "matter-js";
import { Sprite } from "pixi.js";
import { gameObject } from "./GameObject2";

export class Player extends gameObject {
    constructor(x: number, y: number) {
        const sprite = Sprite.from('./assets/square.png')
        super(sprite, Bodies.rectangle(x, y, 100, 20,))
    }

    gameloop() { }
}