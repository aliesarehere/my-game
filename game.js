import { preloadPlayer, createPlayer, updatePlayer } from './player.js';  // Import player functions
import { createCollectibles } from './collectibles.js';  // Import collectibles functions
import { updateTail, checkTailCollision } from './tail.js';  // Import tail functions

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });  // Define the scene with a key
    }

    preload() {
        // Preload assets for the game
        this.load.image('background', 'assets/background.png');  // Preload background
        preloadPlayer(this);  // Preload player assets
        this.load.image('diamond', 'assets/diamond.png');  // Preload diamond image
        this.load.image('money', 'assets/dolar.png');  // Preload money image
        this.load.image('bag', 'assets/tailbag.png');  // Preload tail segment image
    }

    create() {
        // Add and scale the background
        this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background').setDisplaySize(window.innerWidth, window.innerHeight);

        // Reset score and tail when the scene is created or restarted
        this.score = 0;  // Initialize the score as part of the scene object
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#fff' });  // Display the score

        // Create player and collectibles
        createPlayer(this);  // Create the player sprite
        createCollectibles(this);  // Create collectibles like diamonds and money

        // Initialize keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Add invisible on-screen controls (mobile controls)
        this.addInvisibleOnScreenControls();  // Call the method to add touch controls
    }

    update(time, delta) {
        // Update player movement, tail behavior, and check for collisions
        updatePlayer(this, this.cursors);  // Update player movement
        updateTail();  // Update the tail's movement
        checkTailCollision(this);  // Check if the player collides with their own tail
    }

    // Method to restart the game and reset state
    restartGame() {
        this.scene.restart();  // Restart the current scene, resetting all objects and variables
    }

    // Method to add invisible on-screen touch controls
    addInvisibleOnScreenControls() {
        // Create invisible button regions for controls
        const bottomHalf = window.innerHeight / 2;

        // Invisible Up button area (top center of the bottom half)
        const upButtonArea = this.add.rectangle(window.innerWidth / 2, bottomHalf - 100, 200, 200, 0x000000, 0).setInteractive();
        upButtonArea.on('pointerdown', () => this.cursors.up.isDown = true);
        upButtonArea.on('pointerup', () => this.cursors.up.isDown = false);

        // Invisible Down button area (bottom center of the bottom half)
        const downButtonArea = this.add.rectangle(window.innerWidth / 2, window.innerHeight - 100, 200, 200, 0x000000, 0).setInteractive();
        downButtonArea.on('pointerdown', () => this.cursors.down.isDown = true);
        downButtonArea.on('pointerup', () => this.cursors.down.isDown = false);

        // Invisible Left button area (left side of the bottom half)
        const leftButtonArea = this.add.rectangle(100, window.innerHeight - 150, 200, 200, 0x000000, 0).setInteractive();
        leftButtonArea.on('pointerdown', () => this.cursors.left.isDown = true);
        leftButtonArea.on('pointerup', () => this.cursors.left.isDown = false);

        // Invisible Right button area (right side of the bottom half)
        const rightButtonArea = this.add.rectangle(window.innerWidth - 100, window.innerHeight - 150, 200, 200, 0x000000, 0).setInteractive();
        rightButtonArea.on('pointerdown', () => this.cursors.right.isDown = true);
        rightButtonArea.on('pointerup', () => this.cursors.right.isDown = false);
    }
}
