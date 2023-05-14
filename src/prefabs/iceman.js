class iceman extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, spritesheet) {
        super(scene, scene.game.config.width + 50, Phaser.Math.Between(0, scene.game.config.height), spritesheet);
        this.setTint(Phaser.Display.Color.RandomRGB().color);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // set velocity to move in -x direction
        this.body.setVelocityX(-200);
        this.body.setAllowGravity(false);

        // set up 'attack' animation
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers(spritesheet, { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        // start 'attack' animation and set callback function to loop animation
        this.anims.play('attack');

        // detect collisions with protagonist and pause scene when collision occurs
        scene.physics.add.collider(this, scene.proto, () => {
            scene.physics.pause();
            //scene.proto.destroy();
            this.destroy();
            scene.sound.stopAll();
            scene.gameOver = true;
        });
  
    }

    update() {
        // check if iceman is onscreen
        if (this.x < -50) {
            this.destroy();
        }
    }
}