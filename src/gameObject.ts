import { Sprite } from 'pixi.js'; //importing libraries
import { Body, Composite } from 'matter-js';
import * as uuid from 'uuid';

export abstract class gameObject { //new class that defines a game object.

    pixiData: Sprite;  //type declarations for class properties Pixi = sprites only, 
    matterData: Body; // matter only accepts bodies
    uuid: string; //the indentifier for the object can only be a string.
    
        constructor(pixiData: Sprite, matterData: any) {
        this.pixiData = pixiData; 
        this.matterData = matterData;

        this.uuid = uuid.v4() //creates a unique identifier for the sprite.
    }

    abstract spawn(): void; //creates a spawn property that is required to return void/

    abstract gameloop(delta: number): void  

    /**
     * updatePixiPosition, maps the pixi posistion data to to matter
     * 
     */
    public updatePixiPosition() {
        if (!this.matterData || !this.pixiData == false){ //checks that the data is actually there,
            return //errors out if it does not exist.
        }

        this.pixiData.position.x = this.matterData.position.x; //mpaing pixi positioniny and rotation to matter. 
        this.pixiData.position.y = this.matterData.position.y; 
        this.pixiData.rotation = this.matterData.angle

    }

}

