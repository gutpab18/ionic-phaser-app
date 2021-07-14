import Phaser from "phaser";

var score = 0;
var scoreText;


export class PlatformerGameOver extends Phaser.Scene {
    constructor() {
        super("PlatformerGameOver");
        
    }

    initialize() {
        Phaser.Scene.call(this, { "key": "PlatformerGameOver" });
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');     
    }


    create() {
        this.add.image(400, 300, 'sky');  
        var text = this.add.text(220, 100, '', { font: '64px Courier', fill: '#26c988' });

        text.setText([
            'You Lost...'
        ]);   
        
    const helloButton = this.add.text(330,330 , 'Restart', { fill: '#26c988' });
    helloButton.setInteractive();

    helloButton.on('pointerover', () => {this.scene.start("Platformer")  });
    }
     

    update(time, delta) {

    }
}