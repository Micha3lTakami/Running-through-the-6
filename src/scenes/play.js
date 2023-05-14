class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    // create()
    // create play scene
    create() {
        let gameMusic = this.sound.add('gameMusic', { loop: true });
        gameMusic.play();

        let scoreConfig = {
            fontFamily: 'Helvetica',
            fontSize: '24px',
            color: '#F7E7CE',
            backgroundColor: '#F5DEB3',
            padding: {
                x: 10,
                y: 5
            },
            align: 'center'
        };
        this.score = this.add.text(0, 0, 'BARS: 0', scoreConfig);
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
        //this.physics.add.collider(this.proto, this.newIceman, this.gameOver, null, this);
        this.keyM = this.input.keyboard.addKey('M');
        this.keySPACE = this.input.keyboard.addKey('SPACE');
    }
    


    // update()
    // menu update function
    update() {
        let playConfig = {
            fontFamily: 'Helvetica',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#F7E7CE',
            allign: 'center',
            fixedWidth: 0
        }

        let scoreConfig = {
            fontFamily: 'Helvetica',
            fontSize: '24px',
            color: '#000',
            backgroundColor: '#F5DEB3',
            padding: {
                x: 10,
                y: 5
            },
            align: 'center'
        };
        this.proto.update();
        this.city.tilePositionX += 5;
        if(this.proto.rappedTime > 0){
            this.score.destroy();
            this.score = this.add.text(0, 0, 'BARS: ' + this.proto.rappedTime, scoreConfig);
        }
        if (this.gameOver == true) {
            this.gameOver = true;
            this.proto.canRap = false;
            this.city.tilePositionX += 0;
            let GO = this.add.text(w / 2, h / 4, 'GAME OVER', playConfig).setOrigin(0.5);
            let score = this.proto.rappedTime;
            let BARS = this.add.text(w / 2, h / 3.4, 'BARS RAPPED: ' + score, playConfig).setOrigin(0.5);
            let REST = this.add.text(w / 2, h / 3, 'Press (SPACE) to restart or (M) for Menu', playConfig).setOrigin(0.5);
    
            if (this.keyM.isDown) {
                GO.destroy();
                BARS.destroy();
                REST.destroy();
                this.gameOver = false;
                this.scene.start('menuScene');
            }
            if (this.keySPACE.isDown) {
                GO.destroy();
                BARS.destroy();
                REST.destroy();
                this.gameOver = false;
                this.scene.start('playScene');
            }
        }
    }
}