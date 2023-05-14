class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    // create()
    // create play scene
    create() {
        let gameMusic = this.sound.add('gameMusic', { loop: true });
        gameMusic.play();
        

        // create city background
        this.city = this.add.tileSprite(0, 0, 960, 640, 'Background').setOrigin(0, 0);
        
        // create protagonist object
        this.proto = new protagonist(this, this.game.config.width / 2, this.game.config.height / 2, 'protagonist');
        this.proto.setScale(2);

        // create iceman objects using a timer event
        this.icemanTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                let newIceman = new iceman(this, 'iceman');
                newIceman.setScale(3);
            },
            loop: true
        });
        let gameOver = false;
    }
    gameOver(){

    }
    // update()
    // menu update function
    update() {
        this.proto.update();
        this.city.tilePositionX += 5;
        if(this.gameOver == true){
            this.gameOver();
        }
    }
}