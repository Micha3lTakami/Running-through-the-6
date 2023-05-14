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
            key: 'right',
            frames: scene.anims.generateFrameNumbers(spritesheet, { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'left',
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

        // initialize rappedTime and canJump variables
        this.rappedTime = 0;
        this.canRap = true;
        this.canJump = true;
        this.canMove = true;
        this.jumpCount = 0; // to keep track of the number of jumps

        // set the collision detection for the sprite
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        // add key inputs
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.keyR = scene.input.keyboard.addKey('R');

        // add rainbow tint effect
        this.rainbowTint = false;
    }

    update() {
        console.log('RAP TIME: ' + this.rappedTime + ' JUMP COUNT: ' + this.jumpCount);

        // check for keyboard input
        if (this.cursors.left.isDown && this.canMove) {
            this.body.setVelocityX(-200);
            this.anims.play('left', true);
            this.canRap = false;
        } 
        else if (this.cursors.right.isDown && this.canMove) {
            this.body.setVelocityX(200);
            this.anims.play('right', true);
            this.canRap = false;
        } 
        else {
            this.body.setVelocityX(pushBack);
            this.anims.play('stay', true);
        }
    
        // check if the up key is pressed and the sprite can jump
        if (this.cursors.up.isDown && this.canJump) {
            if (this.jumpCount < 30) {
                this.body.setVelocityY(-500);
                this.jumpCount++;
            }
        }
    
        // check if the r key is down
        if (this.keyR.isDown) {
            if (this.canRap) {
                this.rainbowTint = true;
                this.canJump = false;
                this.canMove = false;
                this.rappedTime += 1;
            }
        } 
        else {
            this.canRap = true;
            this.rainbowTint = false;
            this.canMove = true;
        }
    
        // if body on ground
        if (this.body.onFloor()) {
            this.jumpCount = 0;
            this.canJump = true;
        }

    
        // apply rainbow tint effect
        if (this.rainbowTint) {
            this.setTint(0xff00ff);
        } 
        else {
            this.clearTint();
        }
    }
}