// Michael Takami
// Running Through the 6

// enable JS Strict Mode
'use strict';

// define and configure main Phaser game object
let config = {
    type: Phaser.AUTO,
    // set parent container for where playscreen should be displayed on webpage
    parent : 'runner',
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Loader, Start, Menu, Play]
}

// define game
let game = new Phaser.Game(config);

// reserve keyboard variables
let keyUP, keyLEFT, keyRIGHT, keyENTER, keyR;

// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
let enemyVelocity = 150;
let highScore;

