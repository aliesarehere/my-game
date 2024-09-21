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
        this.background = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background').setDisplaySize(window.innerWidth, window.innerHeight);
        
        // Reset score and tail when the scene is created or restarted
        this.score = 0;  // Initialize the score as part of the scene object
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#fff' });  // Display the score

        // Create player and collectibles
        createPlayer(this);  // Create the player sprite
        createCollectibles(this);  // Create collectibles like diamonds and money

        // Initialize keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Add mobile two-button controls for changing directions
        this.addMobileControls();

        // Scale game elements based on device screen size
        this.scaleGameElements();
        
        // Add resize event listener to apply scaling when the window is resized
        window.addEventListener('resize', () => {
            this.scaleGameElements();
        });
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

    // Method to add two-button mobile controls for changing directions
    addMobileControls() {
        const bottomY = window.innerHeight - 100;  // Y position for the buttons

        // Clockwise button (right side of the screen)
        const clockwiseButton = this.add.rectangle(window.innerWidth - 100, bottomY, 100, 100, 0x000000, 0.3).setInteractive();
        clockwiseButton.on('pointerdown', () => this.changeDirection('clockwise'));

        // Counterclockwise button (left side of the screen)
        const counterclockwiseButton = this.add.rectangle(100, bottomY, 100, 100, 0x000000, 0.3).setInteractive();
        counterclockwiseButton.on('pointerdown', () => this.changeDirection('counterclockwise'));
    }

    // Method to change direction based on button press
    changeDirection(turnDirection) {
        const currentDirection = this.cursors.direction;  // Assume we are using direction tracking logic
        let newDirection;

        const directions = ['RIGHT', 'DOWN', 'LEFT', 'UP'];

        const currentIndex = directions.indexOf(currentDirection);

        if (turnDirection === 'clockwise') {
            // Move to the next direction in the array
            newDirection = directions[(currentIndex + 1) % directions.length];
        } else if (turnDirection === 'counterclockwise') {
            // Move to the previous direction in the array
            newDirection = directions[(currentIndex - 1 + directions.length) % directions.length];
        }

        // Update the direction of movement
        this.cursors.direction = newDirection;  // Assume the cursors object is tracking the direction
    }

    // Method to scale game elements proportionally based on screen size
    scaleGameElements() {
        const scaleX = window.innerWidth / this.background.width;
        const scaleY = window.innerHeight / this.background.height;
        const scale = Math.max(scaleX, scaleY);
        
        // Scale the background proportionally
        this.background.setScale(scale).setScrollFactor(0);

        // Scale the score text if initialized
        if (this.scoreText) {
            this.scoreText.setFontSize(24 * scale);
        }
    }
}
