import { Bodies } from "matter-js";
import GameObject from "./GameObject";
import {app} from "./index";

export class Boundary extends GameObject{
    constructor(x: number, y: number) {
        super(null, Bodies.rectangle(x, y, app.view.width, 0.0001, {isStatic: true}))
    }

    gameloop(){}
}