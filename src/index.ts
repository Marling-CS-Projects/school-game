import { Application } from "pixi.js";
import * as PIXI from "pixi.js";
import * as Matter from "matter-js";
import "./style.css";
import { Player } from "./Player";
import { elapsedSeconds } from "./Map";
import { createBaseGUI, createGameEnd, createStartMenu } from "./gui";
import { GameMap } from "./Map";
import { addScore } from "./score";
import { Border } from "./Floor";
import { ProvidePlugin } from "webpack";
import { BorderWall } from "./Wall";

let keys: any = {};
let Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body;
let engine = Engine.create();

//Creating the application/stage in PIXI
const app = new Application({
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
let ceiling: Border;
let floor: Border;
let score: any;
let scoreText: any
let wall: BorderWall;

/*function that returns the refreshed 
  text to */
function createScoreText() { 
  return `Score: ${score}`;
}
/* function called in the gameloop, refreshes score varaible 
and resets the score text*/
function setScore(){
  score = elapsedSeconds;
  scoreText.text = createScoreText();
}
 /* creates the new text element and passes in the score, 
 also styles the text so the font is white and can be seen
 */ 
scoreText = new PIXI.Text(createScoreText());
scoreText.style = new PIXI.TextStyle({
  fill: 0xffffff
})


export let gameStart = () => {
  map = new GameMap(engine, app);
  map.platforms.forEach((platform) => {
    app.stage.addChild(platform.pixiData);
    World.add(engine.world, [platform.matterData, platform.collisionData]);
  });

  floor = new Border(engine, app, app.view.width / 2, app.view.height);
  World.add(engine.world, floor.matterData);

  //adds ceiling so player doenst float off.
  ceiling = new Border(engine, app, 0, 0);
  World.add(engine.world, ceiling.matterData);

  wall = new BorderWall(engine, app, -10, app.view.height/2)
  World.add(engine.world, wall.matterData)

  player = new Player(engine, app, app.view.width / 2, app.view.height / 2);

  app.stage.addChild(player.pixiData);
  World.add(engine.world, [player.matterData]);

  app.stage.addChild(scoreText)

  playing = true;
};

createBaseGUI();

createStartMenu();

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

  app.stage.removeChild(scoreText); 

  createGameEnd();
};

Matter.Events.on(engine, "collisionStart", function (event) {
  if (!playing) {
    return;
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
          // console.log("Gameover");
          gameEnd();
          break;
        }
      }
      if (collidingWith == floor.matterData) {
        gameEnd();
      }

      if (collidingWith == wall.matterData) {
        gameEnd()        
      }
    });
});

// Keeping track of which keys are pressed
window.addEventListener("keydown", keysDown);
window.addEventListener("keyup", keysUp);

function keysDown(e: KeyboardEvent) {
  // console.log(e.code);
  keys[e.code] = true;
}

function keysUp(e: KeyboardEvent) {
  // console.log(e.code);
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

  setScore()
}

app.ticker.add(gameloop);

// const r = Matter.Render.create({
//   engine: engine,
//   options: {
//     wireframes: true,
//   },
// });
// Matter.Render.run(r);
// containingDiv.appendChild(r.canvas);
