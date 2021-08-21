import { Application, AppLoaderPlugin, Loader, LoaderResource, PlaneGeometry, Rectangle, Sprite, Texture } from 'pixi.js';
import * as PIXI from "pixi.js";
import * as Matter from "matter-js";
import './style.css';
import { matchesProperty, partition, update } from 'lodash';
import { Player } from './Player';
import {  Bottom,  } from './Bottom';
import { generateGameMap } from './Map';

let keys: any = {};
let Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body;
let engine = Engine.create(
  
)


//Creating the application/stage in PIXI
export const app = new Application({ 
  width: 1920,
  height: 1080,
});

app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = "block";

// Add the canvas to the document
document.body.appendChild(app.view);


let map = generateGameMap();
map.platforms.forEach(platform => {
  app.stage.addChild(platform.pixiData)
  World.add(engine.world, platform.matterData)
});
//Introduces simple cube sprite from file. 

let texture = PIXI.Texture.from('./assets/square.png')

let player = new Player(300, app.view.height/2); 


//app.stage.addChild(background.pixiData)
app.stage.addChild(player.pixiData);

World.add(engine.world,[player.matterData,])



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


Matter.Events.on(engine, "collisionStart", function (event){
  event.pairs
    .filter(pair => pair.bodyA == player.matterData || pair.bodyB == player.matterData)
    .forEach(pair => {
      let collidingWith = pair.bodyA == player.matterData ? pair.bodyB : pair.bodyA
      
      for (let i = 0; i < map.platforms.length; i++) {
        if (collidingWith == map.platforms[i].matterData){
          console.log('colliding innit')
        }
      }
    })
})



app.stage.position.x = -player.matterData.position.x + app.view.width / 2; //centres the camera on the avatar.

function gameloop(delta: number) {
  // Handle Directional Keys
  if (keys["ArrowUp"]) {
    let pushVec = Matter.Vector.create(0, -0.01)
    let posVec = Matter.Vector.create(player.matterData.position.x, player.matterData.position.y)
    Body.applyForce(player.matterData, posVec, pushVec)
  }
  if (keys["ArrowDown"]) {
    let pushVec = Matter.Vector.create(0, 0.02)
    let posVec = Matter.Vector.create(player.matterData.position.x, player.matterData.position.y)
    Body.applyForce(player.matterData, posVec, pushVec)
  }


  player.update(delta)
  map.updatePlatforms(delta);
  map.platforms.forEach(platform=> {
    platform.update(delta)
  });


  Engine.update(engine, delta*10)
}



app.ticker.add(gameloop)
