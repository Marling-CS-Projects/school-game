import GameObject from "./GameObject";
import {Bottom} from "./Bottom";
import {app} from "./index";
import {Body} from "matter-js";

const gameSpeed = 25; // Bigger = the platforms end up moving faster slower. Increasing = flattening the curve

interface PlatformPrefab {
  x: number;
  y: number;
  width: number;
}

export class GameMap {

  platforms: GameObject[];
  gameStartTime: number;

  constructor(positions: PlatformPrefab[]) {
    this.gameStartTime = Date.now(); // set the current time of when the map was created

    // Turn these into platforms
    this.platforms = positions.map(position => {
      return new Bottom(position.x, position.y); // app.view.height / 2 + 150
    });
  }

  updatePlatforms(delta: number) {
    const elapsedMs = Date.now() - this.gameStartTime;
    const elapsedSeconds = elapsedMs / 1000;

    const pixelsToMove = ((Math.pow(elapsedSeconds, 2) / gameSpeed) + 1) * delta; //increases the pixels to move on a logarithmic scale 

    this.platforms.forEach(platform => { //for each platform in the array, translate by the movement speed.
      Body.translate(platform.matterData, {x: -pixelsToMove, y: 0});
    });
  }
}

export function generateGameMap() {
  const positions: PlatformPrefab[] = []; //generates an array of platform positions 
  for(let i = 0; i < 250; i++) { //for testing - an array of 250 platforms, each moving on the x axis and y
    positions.push({
      x: i * 1000,
      y: Math.random() * (app.view.height/2),
      width: 1,
    });
  }

  return new GameMap(positions);
}