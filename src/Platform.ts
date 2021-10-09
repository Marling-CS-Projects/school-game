import { Bodies, Body } from "matter-js";
import { Application, Sprite, Texture, TilingSprite } from "pixi.js";
import GameObject from "./GameObject";
import * as Matter from "matter-js";
import { PowerUp } from "./testPowerup";

export let spriteWidth: any;

export class Platform extends GameObject {
  //inherits the properties from gameObject, (maps PIXI to Matter)

  collisionData: Matter.Body; // matter only accepts bodies
  powerUp: PowerUp;

  constructor(engine: Matter.Engine, app: Application, x: number, y: number) {
    const texture = Texture.from("assets/platform-block.png");
    spriteWidth = Math.floor(Math.random() * (800 - 300) + 300);
    let sprite = new TilingSprite(texture, spriteWidth); //creates randomly sized platform sprites.
    super(
      engine,
      app,
      sprite,
      Bodies.rectangle(x, y, sprite.width, sprite.height, { isStatic: true })
    );
    if (this.matterData.angle != 90) {
      this.matterData.angle = 0;
    }

    this.collisionData = Matter.Bodies.rectangle(
      x - spriteWidth,
      y,
      0.000001,
      sprite.height,
      { isStatic: true }
    );
    if(Math.random() > 0.7) { // 30% chance
      this.powerUp = new PowerUp(engine, app, x, y - (sprite.height / 2 + 32));
    }
    
  }

  update(delta: number) {
    super.update(delta);

    if (this.powerUp) {
      Body.setPosition(this.powerUp.matterData, {
        x: this.matterData.position.x,
        y: this.powerUp.matterData.position.y,
      });
    }
  }

  gameloop() {}
}
