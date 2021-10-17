import { Bodies, Body } from "matter-js";
import { Application, Sprite, Texture, TilingSprite } from "pixi.js";
import GameObject from "./GameObject";
import * as Matter from "matter-js";
import { PowerUp } from "./powerups/testPowerup";
import { Enemy } from "./powerups/enemy";
import { node } from "webpack";

export let spriteWidth: any;

export class Platform extends GameObject {
  //inherits the properties from gameObject, (maps PIXI to Matter)

  collisionData: Matter.Body; // matter only accepts bodies
  powerUp: PowerUp;
  enemy: Enemy;

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

    let whichPowerup = Math.floor(Math.random() * (5 - 1) + 1);
    if (whichPowerup == 1) {
      // 30% chance
      this.enemy = new Enemy(engine, app, x, y - (sprite.height / 2 + 32));
    } else if (whichPowerup == 2) {
      this.powerUp = new PowerUp(engine, app, x, y - (sprite.height / 2 + 32));
    } else if (whichPowerup == 3) {
      this.powerUp;
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

    if (this.enemy) {
      Body.setPosition(this.enemy.matterData, {
        x: this.matterData.position.x,
        y: this.enemy.matterData.position.y,
      });
    }
  }

  gameloop() {}
}
