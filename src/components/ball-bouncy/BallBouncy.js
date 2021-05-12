import Phaser from "phaser";

const gameOptions = {
    bounceHeight: 300,
    ballGravity: 1200,
    ballPower: 1200,
    obstacleSpeed: 250,
    obstacleDistanceRange: [100, 200],
    localStorageName: 'bestballscore',
    bonusRatio: 20
}

export class BallBouncy extends Phaser.Scene{
    constructor(){
        super('PlayGame');
    }
    preload(){
        this.load.image('ball', 'ball.png');
        this.load.image('obstacle', 'cannon.png');
        this.load.image('ground', 'ground.png');
    }
    create(){
        let { width, height } = this.sys.game.canvas;
        this.obstacleGroup = this.physics.add.group();
        this.firstBounce = 0;
        this.ground = this.physics.add.sprite(width / 2, height / 4 * 3, 'ground');
        this.ground.setImmovable(true);
        this.ball = this.physics.add.sprite(width / 10 * 2, height / 4 * 3 - gameOptions.bounceHeight, 'ball');
        this.ball.body.gravity.y = gameOptions.ballGravity;
        this.ball.setBounce(1);
        this.ball.setCircle(25);
        this.ball2 = this.physics.add.sprite(width / 10 * 2, height / 4 * 3 - gameOptions.bounceHeight, 'ball');
        let obstacleX = width;
        for(let i = 0; i < 10; i++){
            let obstacle = this.obstacleGroup.create(obstacleX, this.ground.getBounds().top, 'obstacle');
            obstacle.setOrigin(0.5, 1);
            obstacle.setImmovable(true);
            obstacle.setFrame((Phaser.Math.Between(0, 99) < gameOptions.bonusRatio) ? 0 : 1);
            obstacleX += Phaser.Math.Between(gameOptions.obstacleDistanceRange[0], gameOptions.obstacleDistanceRange[1])
        }
        this.obstacleGroup.setVelocityX(-gameOptions.obstacleSpeed);
        this.input.on('pointerdown', this.boost, this);
        this.score = 0;
        this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        this.scoreText = this.add.text(10, 10, '');
        this.updateScore(this.score);
    }
    updateScore(inc){
        this.score += inc;
        this.scoreText.text = 'Score: ' + this.score + '\nBest: ' + this.topScore;
    }
    boost(){
        if(this.firstBounce != 0){
            this.ball.body.velocity.y = gameOptions.ballPower;
        }
    }
    getRightmostObstacle(){
        let rightmostObstacle = 0;
        this.obstacleGroup.getChildren().forEach(function(obstacle){
            rightmostObstacle = Math.max(rightmostObstacle, obstacle.x);
        });
        return rightmostObstacle;
    }
    updateObstacle(obstacle){
        this.updateScore(1);
        obstacle.x = this.getRightmostObstacle() + Phaser.Math.Between(gameOptions.obstacleDistanceRange[0], gameOptions.obstacleDistanceRange[1]);
        obstacle.setFrame((Phaser.Math.Between(0, 99) < gameOptions.bonusRatio) ? 0 : 1);
    }
    update(){
        this.physics.world.collide(this.ground, this.ball, function(){
            if(this.firstBounce == 0){
                this.firstBounce = this.ball.body.velocity.y;
            }
            else{
                this.ball.body.velocity.y = this.firstBounce;
            }
        }, null, this);
        this.physics.world.overlap(this.ball, this.obstacleGroup, function(ball, obstacle){
            if(obstacle.frame.name == 1){
                localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
                this.scene.start('PlayGame');
            }
            else{
                this.updateObstacle(obstacle);
            }
        }, null, this);
        this.obstacleGroup.getChildren().forEach(function(obstacle){
            if(obstacle.getBounds().right < 0){
                if(obstacle.frame.name == 0){
                    localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
                    this.scene.start('PlayGame');
                }
                else{
                    this.updateObstacle(obstacle);
                }
            }
        }, this)
    }
}