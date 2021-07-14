
import { Bodies } from 'matter-js'
import * as PIXI from 'pixi.js'
import GameObject from './GameObject'

/*var topWall = Bodies.rectangle(400, 50, 720, 20, { isStatic: true });
var leftWall = Bodies.rectangle(50, 210, 20, 300, { isStatic: true });
var rightWall = Bodies.rectangle(750, 210, 20, 300, { isStatic: true });*/

export class Wall extends GameObject {
    constructor(pixiData:any, matterData:any) {
    super(pixiData, matterData)
    }
}

export class Platform extends GameObject {
    constructor(pixiData:any, matterData:any) {
    super(pixiData, matterData)
    }
}