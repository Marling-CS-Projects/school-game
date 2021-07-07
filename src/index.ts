import { Application, Loader, LoaderResource, PlaneGeometry, Rectangle, Sprite, Texture } from 'pixi.js';
import * as PIXI from "pixi.js";
import * as Matter from "matter-js";
import './style.css';
import { update } from 'lodash';
import { Player } from './Player';
import { Background } from './Background';
import { Platform } from './Bottom';

let keys: any = {};
let Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body;
let engine = Engine.create(
  
)


//Creating the application/stage in PIXI
let app = new Application({ 
  width: 1920,
  height: 1080,
});

app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = "block";

// Add the canvas to the document
document.body.appendChild(app.view);

//Introduces simple cube sprite from file. 

let player = new Player(app.view.width/2, app.view.height/2); 
let background = new Background(app.view.width, app.view.height/4)
let platform = new Platform(400, 340)


//app.stage.addChild(background.pixiData)
app.stage.addChild(player.pixiData)
app.stage.addChild(platform.pixiData)


//World.add(engine.world, [background.matterData])
World.add(engine.world,[player.matterData])
World.add(engine.world, [platform.matterData])




//adds sprite to the application

// Keeping track of which keys are pressed
window.addEventListener("keydown", keysDown)
window.addEventListener("keyup", keysUp)

function keysDown(e: KeyboardEvent) {
  console.log(e.code)
  keys[e.code] = true;
}

function keysUp(e: KeyboardEvent) {
  console.log(e.code)
  keys[e.code] = false;
}

function gameloop(delta: number) {
  // Handle Directional Keys
  if (keys["ArrowUp"]) {
    let pushVec = Matter.Vector.create(0, -0.1)
    let posVec = Matter.Vector.create(player.matterData.position.x, player.matterData.position.y)
    Body.applyForce(player.matterData, posVec, pushVec)
  }
  if (keys["ArrowDown"]) {
    Body.setVelocity(player.matterData, {x: 0, y:-5})
  }
  if (keys["ArrowLeft"]) {
    Body.setVelocity(player.matterData, {x: -5, y:0})
  }
  if (keys["ArrowRight"]) {
    Body.setVelocity(player.matterData, {x:5, y:0})
  }

  player.update(delta)

  platform.update(delta)

  Engine.update(engine, delta*10)
}


app.ticker.add(gameloop)
