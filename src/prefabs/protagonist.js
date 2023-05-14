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
        this.body.maxVelocity.x = 200;

        // create cursor keys for input
        this.cursors = scene.input.keyboard.createCursorKeys();

        // create animations
        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers(spritesheet, { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers(spritesheet, { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'stay',
            frames: scene.anims.generateFrameNumbers(spritesheet, { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        // initialize wrappedTime and canJump variables
        this.wrappedTime = 0;
        this.canJump = true;

        // set the collision detection for the sprite
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
    }

    update() {
        // check for keyboard input
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-100);
            this.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.body.setVelocityX(100);
            this.anims.play('right', true);
        } else {
            this.body.setVelocityX(0);
            this.anims.play('stay', true);
        }

        // check if the up key is pressed and the sprite can jump
        if (this.cursors.up.isDown && this.canJump) {
            this.body.setVelocityY(-300);
            this.canJump = false;
        }

        // update wrappedTime and canJump variables
        this.wrappedTime += this.scene.game.loop.delta;
        if (this.wrappedTime > 1000) {
            this.canJump = true;
        }
    }
}