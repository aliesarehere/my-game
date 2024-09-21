import { MainMenuScene } from './menu.js';
import { GameScene } from './game.js';
import { GameOverScene } from './gameover.js';

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: Math.min(window.innerWidth, 1200),  // Dynamically adjust width based on screen size
        height: Math.min(window.innerHeight, 1200),  // Dynamically adjust height based on screen size
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    fps: {
        target: 60,  // Set the game to run at 60 frames per second
        forceSetTimeOut: true,
    },
    dom: {
        createContainer: true,  // Enable handling of DOM elements
    },
    scene: [MainMenuScene, GameScene, GameOverScene],  // Load the scenes in the order: Menu, Game, GameOver
};

window.onload = () => {
    const game = new Phaser.Game(config);  // Initialize Phaser with the configuration

    // Apply initial resize logic
    resizeGame();

    // Add event listener to resize game when the window size changes
    window.addEventListener('resize', resizeGame);
};

// Function to resize the game canvas proportionally
function resizeGame() {
    const canvas = document.querySelector('canvas');
    
    if (canvas) {  // Ensure the canvas exists before resizing
        const width = window.innerWidth;
        const height = window.innerHeight;

        const aspectRatio = 9 / 16;  // Portrait aspect ratio (9:16)
        let newWidth = width;
        let newHeight = height;

        // Determine if the device is in portrait orientation
        if (height / width > aspectRatio) {
            // Adjust width to maintain the 9:16 aspect ratio
            newHeight = height;
            newWidth = height / aspectRatio;
        } else {
            // Otherwise, adjust height to maintain the aspect ratio
            newWidth = width;
            newHeight = width * aspectRatio;
        }

        // Apply the new width and height to the canvas
        canvas.style.width = `${newWidth}px`;
        canvas.style.height = `${newHeight}px`;

        // Center the canvas in the window
        canvas.style.marginLeft = `${(window.innerWidth - newWidth) / 2}px`;
        canvas.style.marginTop = `${(window.innerHeight - newHeight) / 2}px`;
    }
}
