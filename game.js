import { preloadPlayer, createPlayer, updatePlayer, scalePlayerOnResize, player } from './player.js';  // Import player functions
import { createCollectibles } from './collectibles.js';  // Import collectibles functions
import { updateTail, checkTailCollision, growTail, tail } from './tail.js';  // Import tail functions

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.currentDirection = 'RIGHT';  // Initial player direction
        this.directions = ['UP', 'RIGHT', 'DOWN', 'LEFT'];  // Clockwise directions
    }

    preload() {
        // Preload assets for the game
        this.load.image('background', 'assets/background.png');
        preloadPlayer(this);  // Preload player assets
        this.load.image('diamond', 'assets/diamond.png');  // Preload diamond image
        this.load.image('money', 'assets/dolar.png');  // Preload money image
        this.load.image('bag', 'assets/tailbag.png');  // Preload tail segment image
    }

    create() {
        // Add and scale the background
        this.background = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background').setDisplaySize(window.innerWidth, window.innerHeight);
        
        // Initialize score and tail
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#fff' });
        
        // Create player and collectibles
        createPlayer(this);  // Create the player sprite with 1.5x scale
        createCollectibles(this);  // Create collectibles like diamonds and money

        // Initialize keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Add touch controls for mobile
        this.addTouchControls();

        // Add resize event listener to apply scaling when the window is resized
        window.addEventListener('resize', () => {
            this.scaleGameElements();
        });

        // Scale game elements initially
        this.scaleGameElements();
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

        // Handle left button for movement based on current direction
        leftButton.on('pointerdown', () => {
            this.handleLeftButton();
        });

        // Handle right button for movement based on current direction
        rightButton.on('pointerdown', () => {
            this.handleRightButton();
        });

        this.leftButton = leftButton;  // Keep reference to the buttons for scaling
        this.rightButton = rightButton;
    }

    // Method to handle left button press based on current direction
    handleLeftButton() {
        if (this.currentDirection === 'DOWN') {
            // Swap directions when moving down
            this.rotateClockwise();
        } else {
            this.rotateCounterClockwise();
        }
    }

    // Method to handle right button press based on current direction
    handleRightButton() {
        if (this.currentDirection === 'DOWN') {
            // Swap directions when moving down
            this.rotateCounterClockwise();
        } else {
            this.rotateClockwise();
        }
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

        // Ensure the player is 1.5 times bigger than other elements
        scalePlayerOnResize();

        // Scale tail segments proportionally if they exist
        if (tail.length > 0) {
            tail.forEach(segment => segment.setScale(scale));
        }

        // Adjust the size of the buttons for mobile controls
        if (this.leftButton && this.rightButton) {
            this.leftButton.setSize(window.innerWidth / 2, window.innerHeight);
            this.rightButton.setSize(window.innerWidth / 2, window.innerHeight);
        }
    }
}