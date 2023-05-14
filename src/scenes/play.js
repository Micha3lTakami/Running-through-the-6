class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    

    // create()
    // create menu scene
    create() {
        this.sound.play('gameMusic');
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            allign: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        /*
        this.add.text(game.config.width/2, game.config.height/2, 'PLAY', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000'; */
        this.city = this.add.tileSprite(0, 0, 960, 640, 'Background').setOrigin(0, 0);
        this.proto = new protagonist(this,w/2, h/2, 'protagonist');
        this.proto.setScale(2);
        
        


    }

    // update()
    // menu update function
    update() {
        this.proto.update();
        this.city.tilePositionX += 4;
    
    }
    
}