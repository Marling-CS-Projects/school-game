import { Bodies } from "matter-js";
import { Sprite, Application } from "pixi.js";
import GameObject from "../GameObject";
import * as Matter from "matter-js";

export class PowerUp extends GameObject {
  //inherits the properties from gameObject, (maps PIXI to Matter)
  constructor(engine: Matter.Engine, app: Application, x: number, y: number) {
    const sprite = Sprite.from("./assets/square.png");
    super(
      engine,
      app,
      sprite,
      Bodies.rectangle(x, y, 64, 64, { inertia: Infinity, isStatic: true, })
    );
  }

  gameloop() {}

  update(delta: number) {
    super.update(delta);
  }
}
