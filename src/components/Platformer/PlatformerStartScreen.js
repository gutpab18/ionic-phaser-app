import Phaser from "phaser";

var score = 0;
var scoreText;


export class PlatformerStartScreen extends Phaser.Scene {
    constructor() {
        super("PlatformerStartScreen");

    }

    initialize() {
        Phaser.Scene.call(this, {"key": "PlatformerStartScreen"});
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
    }


    create() {
        this.add.image(400, 300, 'sky');
        var text = this.add.text(45, 100, '', {font: '55px Courier', fill: '#26c988'});

        text.setText([
            'Welcome to Platformer'
        ]);

        const helloButton = this.add.text(330, 330, 'Start', {fill: '#26c988'});
        helloButton.setInteractive();

        /*helloButton.on('pointerup', () => {
            this.scene.start("Platformer")
        });*/

        helloButton.on('pointerup', function (pointer) {

            this.scene.start('Platformer');

        }, this);
    }


    update(time, delta) {

    }
}