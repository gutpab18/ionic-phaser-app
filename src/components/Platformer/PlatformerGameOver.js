import Phaser from "phaser";

var score = 0;
var scoreText;


export class PlatformerGameOver extends Phaser.Scene {
    constructor() {
        super("PlatformerGameOver");
        
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');     
    }


    create() {
        this.add.image(400, 300, 'sky');     
    }


    update() {
    }
}