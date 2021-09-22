import { Bodies } from "matter-js";
import { Sprite, Application } from "pixi.js";
import GameObject from "./GameObject";
import * as Matter from "matter-js";

export class Player extends GameObject {
  //inherits the properties from gameObject, (maps PIXI to Matter)
  constructor(engine: Matter.Engine, app: Application, x: number, y: number) {
    const sprite = Sprite.from("./assets/square.png");
    super(
      engine,
      app,
      sprite,
      Bodies.rectangle(x, y, 64, 64, { inertia: Infinity })
    );
  }

  gameloop() {}

  moveLeft() {
    Matter.Body.applyForce(this.matterData, this.matterData.position, {
      x: -0.002,
      y: 0,
    });
  }

  update(delta: number) {
    super.update(delta);

    if (this.matterData.position.y << 0) {
      this.matterData.position.y == 0;
    }
  }
}
