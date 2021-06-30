import { Application, Loader, LoaderResource, PlaneGeometry, Rectangle, Sprite, Texture } from 'pixi.js';
import * as PIXI from "pixi.js";
import * as Matter from "matter-js";
import './style.css';
import { update } from 'lodash';
import { Player } from './Player';

let keys: any = {};
let Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body;
let engine = Engine.create(
  
)

const loader = PIXI.Loader


//Creating the application/stage in PIXI
let app = new Application({ 
  width: window.innerWidth-10, 
  height: window.innerHeight-10 
});

app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = "block";

// Add the canvas to the document
document.body.appendChild(app.view);

//Introduces simple cube sprite from file. 

let player = new Player(app.view.width/2, app.view.height/2); 
app.stage.addChild(player.pixiData)
World.add(engine.world, [player.matterData, ])

var floor = Bodies.rectangle(400, 580, 800, 40, {
  isStatic: true
});

World.add(engine.world, floor);


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

  }
  if (keys["ArrowDown"]) {
  }
  if (keys["ArrowLeft"]) {
    player.moveLeft
  }
  if (keys["ArrowRight"]) {
  }

  player.update(delta)

  Engine.update(engine, delta*10)
}


app.ticker.add(gameloop)
