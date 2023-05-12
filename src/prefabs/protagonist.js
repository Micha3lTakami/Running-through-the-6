class protagonist extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spritesheet) {
        super(scene, x, y, spritesheet);

        // add object to existing scene
        scene.add.existing(this);

        // enable physics on the sprite
        scene.physics.add.existing(this);

        // apply gravity to the sprite
        this.body.gravity.y = 200;

        // set the maximum velocity of the sprite
        this.maxVelocity = 200;

        // create cursor keys for input
        this.cursors = scene.input.keyboard.createCursorKeys();

        // create animations
        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers(spritesheet, { start: 4, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers(spritesheet, { start: 7, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'stay',
            frames: scene.anims.generateFrameNumbers(spritesheet, { start: 1, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        // initialize wrappedTime and canJump variables
        this.wrappedTime = 0;
        this.canJump = true;

        // set the collision detection for the sprite
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.world.on('worldbounds', this.onWorldBounds, this);
    }

    update() {
        // update the wrappedTime value if the 'r' key is held down
        if (this.cursors.r.isDown) {
            this.wrappedTime += 1;
            this.anims.play('stay', true);
            this.setVelocityX(0);
        } else {
            // update the sprite's movement if the 'r' key is not held down
            if (this.cursors.left.isDown) {
                this.anims.play('left', true);
                this.setVelocityX(-this.maxVelocity);
            } else if (this.cursors.right.isDown) {
                this.anims.play('right', true);
                this.setVelocityX(this.maxVelocity);
            } else {
                this.anims.play('stay', true);
                this.setVelocityX(0);
            }

            // jump if the 'up' arrow key is pressed and the sprite can jump
            if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.canJump) {
                this.setVelocityY(-200);
                this.canJump = false;
            }
        }
    }

    // function to handle the collision with world bounds
    onWorldBounds(body) {
        if (body.blocked.up || body.blocked.down || body.blocked.left || body.blocked.right) {
            // if the sprite hits any border, the game ends
            this.scene.scene.start('gameOverScene');
        }
        if (body.blocked.down) {
            this.canJump = true;
        }
    }
}