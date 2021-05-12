import Phaser from "phaser";
import '../bullet-scene/BulletScene.css';

export class BallScene extends Phaser.Scene {

    bullet1 = {};
    bullet2 = {};
    speed1 = 0;
    speed2 = 0;
    pressTime = 0;

    constructor() {
        super("ballScene");
    }


    preload() {
        /*
         * Load data and store it in the cache.
         */
        this.load.image('ball', 'https://image.flaticon.com/icons/png/128/3048/3048006.png');
        this.load.image('cannon', 'https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/assets/tests/timer/cannon.png');
        this.load.image('ground', 'https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/assets/tests/timer/ground.png');
    }

    create() {
        //   Bullet 1 (600px in 6 seconds)

        this.add.image(0, 200, 'ground').setOrigin(0);

        this.bullet1 = this.add.sprite(64, 76, 'ball').setOrigin(0);

        this.speed1 = Phaser.Math.GetSpeed(600, 6);

        this.add.image(64, 72, 'cannon').setOrigin(0);

        this.add.text(64, 50, '600px / 6 secs', { fill: '#000' });

        //events
        //this.events.on("swipe-up", this.onSwipe, false);
        this.input.on('pointerdown', (event) => {
            this.pressTime = event.upTime;
            console.log(event.upTime)
        }, this);

        this.input.on('pointerup', (event) => {
            const change = (event.upTime - this.pressTime)/10000;
            this.speed1 += change;
            this.speed2 += change;
            console.log(event.upTime)
        }, this);

    }

    update(time, delta) {
        this.bullet1.x += this.speed1 * delta;
        this.bullet1.y += this.speed1 * delta;

        /*if (canvasData.x + canvasData.r >ctx.canvas.width){
            canvasData.xspeed*=-1
        }
        if (canvasData.x - canvasData.r <0){
            canvasData.xspeed*=-1
        }
        if (canvasData.y + canvasData.r >ctx.canvas.height){
            canvasData.yspeed*=-1
        }
        if (canvasData.y - canvasData.r <0){
            canvasData.yspeed*=-1
        }*/
    }

    nearBall(swipeEvent) {
        const fingerX = swipeEvent.startX;
        const fingerY = swipeEvent.startY;
        const ballX = this.bullet1.x;
        const ballY = this.bullet1.y;
        const nearBall = (Math.abs(fingerX - ballX) < 150
            && Math.abs(fingerY - ballY) < 150);

        console.log(nearBall);
        return nearBall;
    }

    ballMovesTooFast() {
        return this.bullet1.y > 25;
    }

    onSwipe(event) {
        console.log(this.speed1);
        this.speed1 = Phaser.Math.GetSpeed(600, 1);
        /*if (this.nearBall(event)) {
            const change = 20 * event.velocityY;
            console.log("test: " + change);
            this.bullet1.y = change;
            this.bullet1.numSwipes += 1;
        }

        if (this.ballMovesTooFast()) {
            this.bullet1.y = 10;
        }*/
    }
}