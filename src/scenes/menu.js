// menu scene
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    

    // create()
    // create menu scene
    create() {
        this.cameras.main.fadeIn(500);
        let menuConfig = {
            fontFamily: 'Helvetica',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#2f412b',
            allign: 'center',
            fixedWidth: 0
        }
        let backg = this.add.image(w/2, h/2, 'MenuBackground').setOrigin(0.5);
        let logo = this.add.image(w/2, h/14, 'Title_Logo').setOrigin(0.5);
        let instructText = this.add.image(w/2, h/3.25, 'MenuInstructions').setOrigin(0.5);
        instructText.setScale(0.8);
        let amateurText = this.add.text(w/7, h/3.25 + 5, 'AMATEUR', menuConfig).setOrigin(0.5);
        let expertText = this.add.text(w*.83, h/3.25 + 5, 'EXPERT',menuConfig).setOrigin(0.5);
        
        // define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    // update()
    // menu update function
    update() {
          if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx_select');
            this.cameras.main.fadeOut(1000,0,0,0);
            this.time.delayedCall(1100, () =>{
                this.scene.start('playScene'); 
            });
          }
          else if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            enemyVelocity += 50;
            this.sound.play('sfx_select');
            this.cameras.main.fadeOut(1000,0,0,0);
            this.time.delayedCall(1100, () =>{
                this.scene.start('playScene'); 
            });
             
          }
    }
}