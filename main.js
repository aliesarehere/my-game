import { MainMenuScene } from './menu.js';
import { GameScene } from './game.js';
import { GameOverScene } from './gameover.js';

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: Math.min(window.innerWidth, 1200),
        height: Math.min(window.innerHeight, 1200)
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    dom: {
        createContainer: true  // Enable DOM element handling
    },
    scene: [MainMenuScene, GameScene, GameOverScene],
};

window.onload = () => {
    const game = new Phaser.Game(config);
};
