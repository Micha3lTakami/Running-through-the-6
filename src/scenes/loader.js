class Loader extends Phaser.Scene {
    constructor() {
        super("loaderScene");
    }
    
    // preload()
    // pre-load game assets
    preload() {
        // add text object for percentage loaded
        let progressText = this.add.text(game.config.width/2, game.config.height/2, '0%', { fontFamily: 'Helvetica', fontSize: '48px', fontStyle: 'bold', fill: '#e6dfcc' }).setOrigin(0.5);

        // update the loading percentage as assets are loaded
        this.load.on('progress', function (value) {
            let percentage = Math.floor(value * 100) + '%';
            progressText.setText(percentage); 
        });

        // load assets(images and audio)
        this.load.audio('sfx_select', './assets/sounds/menu_select.wav');
        this.load.audio('gameMusic', './assets/sounds/6BackgrndMusic.wav');
        this.load.audio('deathNoise', './assets/sounds/drake-death.wav');
        this.load.audio('startButton','./assets/sounds/button.mp3' )
        this.load.image('MenuBackground', './assets/images/6MenuBackground.png');
        this.load.image('MenuInstructions', './assets/images/menuInstructions.png')
        this.load.image('Background', './assets/images/TorontoBCKGRND.png')
        this.load.image('Title_Logo', './assets/images/menuLogo.png');
        
        // load spritesheets 
        this.load.spritesheet('protagonist', './assets/images/protagonist.png', {frameWidth: 16, frameHeight: 25, startFrame: 0, endFrame: 8});
        this.load.spritesheet('iceman', './assets/images/iceman.png', {frameWidth: 27, frameHeight: 25, startFrame: 0, endFrame: 2});
        
        // change scene upon completion
        this.load.on('complete', function () {
            this.cameras.main.fadeOut(1000,0,0,0);
            this.time.delayedCall(700, () =>{
                this.scene.start('startScene')});
        }, this);

    }
  
}
