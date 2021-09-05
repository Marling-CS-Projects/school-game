import {
  Application,
  AppLoaderPlugin,
  Loader,
  LoaderResource,
  PlaneGeometry,
  Rectangle,
  Sprite,
  Texture,
} from "pixi.js";
import * as Matter from "matter-js";
import "./style.css";
import { Player } from "./Player";
import { elapsedSeconds, generateGameMap } from "./Map";
import { Boundary } from "./Floor";
import { createBaseGUI, createGameEnd, createStartMenu } from "./gui";
import { GameMap } from './Map';
import { addScore } from "./score";

let keys: any = {};
let Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body;
let engine = Engine.create();

//Creating the application/stage in PIXI
export const app = new Application({
  width: 1920,
  height: 1080,
});

//app.renderer.view.style.position = "absolute";
//app.renderer.view.style.display = "block";

// Add the canvas to the document
const containingDiv = document.createElement("div");
containingDiv.classList.add("container");
containingDiv.appendChild(app.view);

document.body.appendChild(containingDiv);

let map: GameMap = null;
let player: Player = null;
let playing = false;

export let gameStart = () => {
  map = generateGameMap();
  map.platforms.forEach((platform) => {
    app.stage.addChild(platform.pixiData);
    World.add(engine.world, [platform.matterData, platform.collisionData]);
  });

  player = new Player(300, app.view.height / 2);

  app.stage.addChild(player.pixiData);
  World.add(engine.world, [player.matterData]);

  app.stage.position.x = -player.matterData.position.x + app.view.width / 2; //centres the camera on the avatar.

  playing = true;
}



createBaseGUI();

createStartMenu()

//Introduces simple cube sprite from file.


let gameEnd = () => {
  playing = false;

  map.platforms.forEach((platform) => {
    app.stage.removeChild(platform.pixiData);
    World.remove(engine.world, platform.matterData);
    World.remove(engine.world, platform.collisionData);
  });

  app.stage.removeChild(player.pixiData);
  World.remove(engine.world, player.matterData);

  addScore(elapsedSeconds);

  map = null;
  player = null;

  createGameEnd();

};

Matter.Events.on(engine, "collisionStart", function (event) {

  if (!playing) {
    return    
  }
  //when Matter detects a collison start
  event.pairs
    .filter(
      (pair) =>
        pair.bodyA == player.matterData || pair.bodyB == player.matterData
    ) //filter with avatar as bodyA or bodyB
    .forEach((pair) => {
      let collidingWith =
        pair.bodyA == player.matterData ? pair.bodyB : pair.bodyA; //checks if the avatar is bodyA or B
      //for ground collisions
      for (let i = 0; i < map.platforms.length; i++) {
        if (collidingWith == map.platforms[i].collisionData) {
          console.log("Gameover");
          gameEnd();
          break
        }
      }
    });
});




// Keeping track of which keys are pressed
window.addEventListener("keydown", keysDown);
window.addEventListener("keyup", keysUp);

function keysDown(e: KeyboardEvent) {
  console.log(e.code);
  keys[e.code] = true;
}

function keysUp(e: KeyboardEvent) {
  console.log(e.code);
  keys[e.code] = false;
}



function gameloop(delta: number) {
  // Handle Directional Keys
  if (!playing) {
    return;
  }

  if (keys["ArrowUp"]) {
    let pushVec = Matter.Vector.create(0, -0.1);
    let posVec = Matter.Vector.create(
      player.matterData.position.x,
      player.matterData.position.y
    );
    Body.applyForce(player.matterData, posVec, pushVec);
  }
  if (keys["ArrowDown"]) {
    let pushVec = Matter.Vector.create(0, 0.1);
    let posVec = Matter.Vector.create(
      player.matterData.position.x,
      player.matterData.position.y
    );
    Body.applyForce(player.matterData, posVec, pushVec);
  }

  player.update(delta);
  map.updatePlatforms(delta);
  map.platforms.forEach((platform) => {
    platform.update(delta);
  });

  Engine.update(engine, delta * 10);

}

app.ticker.add(gameloop);