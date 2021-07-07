import { Bodies } from 'matter-js'
import * as PIXI from 'pixi.js'
import GameObject from './GameObject'

export class Wall extends GameObject {
    constructor(pixiData:any, matterData:any) {
    super(pixiData, matterData)
    }

}