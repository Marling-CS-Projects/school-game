import { Bodies } from "matter-js";
import { Sprite } from "pixi.js";
import GameObject from "./GameObject";
import * as Matter from 'matter-js'

export class Player extends GameObject { //inherits the properties from gameObject, (maps PIXI to Matter)
    constructor(x: number, y: number) {
        const sprite = Sprite.from('./assets/square.png')
        super(sprite, Bodies.rectangle(x, y, 128, 128,))

        if (this.matterData.angle != 90) { //attempt to prevent avatar from rotating. currently non-functional.
            this.matterData.angle = 0;
        }
    }

    gameloop(){}

    moveLeft(){
        Matter.Body.applyForce(this.matterData, this.matterData.position, { x: -0.002, y: 0 });
    }

}