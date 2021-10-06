import { Bodies } from "matter-js";
import { Sprite, Texture, TilingSprite, Application } from "pixi.js";
import GameObject from "./GameObject";
import * as Matter from "matter-js";

export class BorderWall extends GameObject {
  //inherits the properties from gameObject, (maps PIXI to Matter)

  collisionData: Matter.Body; // matter only accepts bodies

  constructor(engine: Matter.Engine, app: Application, x: number, y: number) {
    const texture = Texture.from("assets/platform-block.png");
    let spriteWidth = app.view.height;
    let sprite = new TilingSprite(texture, spriteWidth); //creates randomly sized platform sprites.
    super(
      engine,
      app,
      sprite,
      Bodies.rectangle(x, y, 0.00001, 1080, { isStatic: true })
    );
    if (this.matterData.angle != 90) {
      this.matterData.angle = 0;
    }
  }

  gameloop() {}
}
