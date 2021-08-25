import { Sprite } from 'pixi.js'; //importing libraries
import { Body } from 'matter-js';
import * as uuid from 'uuid';

export default abstract class GameObject { //new class that defines a game object.

    pixiData: Sprite;  //type declarations for class properties Pixi = sprites only, 
    matterData: Body;
    collisionData: Body // matter only accepts bodies
    uuid: string; //the indentifier for the object can only be a string.

    constructor(pixiData: Sprite, matterData: Body, collisionData: Body) {
        this.pixiData = pixiData;
        this.matterData = matterData;
        this.collisionData;

        if (!this.matterData || !this.pixiData) { //checks that the data is actually there,
            throw new Error('Invalid construction of game object')
        }

        this.pixiData.anchor.set(0.5);

        this.uuid = uuid.v4() //creates a unique identifier for the sprite.
    }

    gameloop(delta: number): void {} //initialises types for 

    update(delta: number){
        this.pixiData.position.x = this.matterData.position.x; //mpaing pixi positioniny and rotation to matter. 
        this.pixiData.position.y = this.matterData.position.y;
        this.pixiData.rotation = this.matterData.angle

    }

}

