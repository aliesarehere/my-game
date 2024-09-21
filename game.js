import { preloadPlayer, createPlayer, updatePlayer, movePlayer } from './player.js';  // Import player functions
import { createCollectibles } from './collectibles.js';  // Import collectibles functions
import { updateTail, checkTailCollision } from './tail.js';  // Import tail functions

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });  // Define the scene with a key
        this.currentDirection = 'RIGHT';  // Initial direction
        this.directions = ['UP', 'RIGHT', 'DOWN', 'LEFT'];  // Directions in clockwise order
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

        // Add on-screen touch controls for mobile
        this.addTouchControls();  // Call the method to add touch controls

        // Scale game elements based on device screen size
        this.scaleGameElements();
        
        // Add resize event listener to apply scaling when the window is resized
        window.addEventListener('resize', () => {
            this.scaleGameElements();
        });
    }

    update(time, delta) {
        // Update player movement, tail behavior, and check for collisions
        updatePlayer(this, this.cursors, this.currentDirection);  // Update player movement
        updateTail();  // Update the tail's movement
        checkTailCollision(this);  // Check if the player collides with their own tail
    }

    // Method to restart the game and reset state
    restartGame() {
        this.scene.restart();  // Restart the current scene, resetting all objects and variables
    }

    // Method to add touch controls for mobile devices
    addTouchControls() {
        // Create left button covering the entire left vertical half of the screen
        const leftButton = this.add.rectangle(0, 0, window.innerWidth / 2, window.innerHeight, 0x000000, 0).setOrigin(0).setInteractive();
        // Create right button covering the entire right vertical half of the screen
        const rightButton = this.add.rectangle(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight, 0x000000, 0).setOrigin(0).setInteractive();

        // Handle left button for counterclockwise rotation
        leftButton.on('pointerdown', () => {
            this.rotateCounterClockwise();
        });

        // Handle right button for clockwise rotation
        rightButton.on('pointerdown', () => {
            this.rotateClockwise();
        });

        // Continuously update the player's movement based on the current direction
        leftButton.on('pointerdown', () => {
            movePlayer(this);  // Call player movement
        });
        rightButton.on('pointerdown', () => {
            movePlayer(this);  // Call player movement
        });
    }

    // Method to rotate the direction counterclockwise
    rotateCounterClockwise() {
        const currentIndex = this.directions.indexOf(this.currentDirection);
        const newIndex = (currentIndex - 1 + this.directions.length) % this.directions.length;
        this.currentDirection = this.directions[newIndex];
    }

    // Method to rotate the direction clockwise
    rotateClockwise() {
        const currentIndex = this.directions.indexOf(this.currentDirection);
        const newIndex = (currentIndex + 1) % this.directions.length;
        this.currentDirection = this.directions[newIndex];
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
