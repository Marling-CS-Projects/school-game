import { Application, Loader, LoaderResource, PlaneGeometry, Rectangle, Sprite, Texture } from 'pixi.js';
import * as PIXI from "pixi.js";
import * as Matter from "matter-js";
import './style.css';
import { update } from 'lodash';

let keys: any = {};
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body;
let engine = Engine.create()

const loader = PIXI.Loader


//Creating the application/stage in PIXI
let app = new Application({ width: 800, height: 600 });

app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = "block";

// Add the canvas to the document
document.body.appendChild(app.view);

//Introduces simple cube sprite from file. 



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

function gameloop() {
  // Handle Directional Keys
  if (keys["ArrowUp"]) {
  }
  if (keys["ArrowDown"]) {
  }
  if (keys["ArrowLeft"]) {
  }
  if (keys["ArrowRight"]) {
  }
}


app.ticker.add(gameloop)
