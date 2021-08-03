import Phaser from "phaser";

var score = 0;
var scoreText;


export class Platformer extends Phaser.Scene {
    constructor() {
        super("Platformer");
        this.platformPosition = [{
            x: 600,
            y: 400,
        }, {
            x: 50,
            y: 250
        }, {
            x: 750,
            y: 220
        }];
    }

    initialize(config) {
        Phaser.Scene.call(this, { "key": "Platformer" });
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/red_ball.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            {frameWidth: 32, frameHeight: 48}
        );
    }


    async create(config) {
        this.add.image(400, 300, 'sky');

        this.platforms = this.physics.add.staticGroup();
        for (const position of this.platformPosition) {
            this.platforms.create(position.x, position.y, 'ground')
        }
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();


        this.player = this.physics.add.sprite(100, 100, 'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1


        });

        this.anims.create({
            key: 'turn',
            frames: [{key: 'dude', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });
        this.player.body.setGravityY(300)
        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: {x: 12, y: 0, stepX: 70}

        });

        this.stars.children.iterate(function (child) {
            child.body.setGravityY(300)
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
        this.physics.add.collider(this.stars, this.platforms);

        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        this.scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
        this.score = 0;

        this.highScoreText = this.add.text(200, 16, 'high score: ' + await this.game.config.store.get('highScore'), {fontSize: '32px', fill: '#000'});

        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

    }

    hitBomb(player, bomb) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        this.gameOver = true;
    }

    async collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        const highScore = await this.game.config.store.get('highScore');
        if (this.score > highScore) {
            await this.game.config.store.set('highScore', this.score);
            this.highScoreText.setText('high score: ' + this.score);
        }

        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.setGravityY(300);
        }
    }


    update(time, delta) {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
        if (this.score > 500){
            this.platformPosition = [{
                x: 450,
                y: 150,
            }, {
                x: 320,
                y: 124
            }, {
                x: 344,
                y: 103
            }];
        }
        if (this.gameOver){
            this.gameOver = false;
            this.score = 0;
            this.scene.start("PlatformerGameOver")
        }
    }

}