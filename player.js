import { speedSettings } from './speed.js';  // Import speed settings

export let player, lastDirection = 'RIGHT', currentDirection = 'RIGHT', lastMoveTime = 0;
const playerSpeed = speedSettings.playerSpeed, moveDelay = speedSettings.moveDelay;
let playerScale = 1;  // Set player scale to 1.5 times bigger than others
let targetX, targetY;  // Variables to store target positions for smooth movement

// Preload player sprites
export function preloadPlayer(scene) {
    scene.load.image('girl_up', 'assets/rymmaup2.png');
    scene.load.image('girl_down', 'assets/rymmadown2.png');
    scene.load.image('girl_left', 'assets/rymmaleft2.png');
    scene.load.image('girl_right', 'assets/rymmaright2.png');
}

// Create player sprite in the game
export function createPlayer(scene) {
    // Set player size to be 1.5 times bigger than other game elements
    playerScale = Math.min(window.innerWidth / 600, 1) * 1;  // Player is 1.5 times bigger
    player = scene.physics.add.sprite(240, 400, 'girl_right').setOrigin(0).setScale(playerScale);
    player.setCollideWorldBounds(true);  // Prevent leaving the screen (basic enforcement)

    targetX = player.x;  // Initialize targetX to the player's current position
    targetY = player.y;  // Initialize targetY to the player's current position
}

// Update player movement
export function updatePlayer(scene, cursors, touchDirection = null) {
    if (!cursors || !cursors.left || !cursors.right || !cursors.up || !cursors.down) {
        return;
    }

    // Handle touch or keyboard input for direction change
    if (touchDirection) {
        currentDirection = touchDirection;
    } else {
        if (cursors.left.isDown && lastDirection !== 'RIGHT') {
            currentDirection = 'LEFT';
        } else if (cursors.right.isDown && lastDirection !== 'LEFT') {
            currentDirection = 'RIGHT';
        } else if (cursors.up.isDown && lastDirection !== 'DOWN') {
            currentDirection = 'UP';
        } else if (cursors.down.isDown && lastDirection !== 'UP') {
            currentDirection = 'DOWN';
        }
    }

    // Only update the position at each movement interval
    if (scene.time.now - lastMoveTime > moveDelay) {
        calculateTargetPosition(scene);  // Calculate the next target position
        lastMoveTime = scene.time.now;
    }

    // Smoothly move the player towards the target position
    movePlayerSmoothly();
}

// Function to calculate the target position based on the current direction
function calculateTargetPosition(scene) {
    const worldBounds = scene.physics.world.bounds;  // Get world bounds for boundary checking

    switch (currentDirection) {
        case 'LEFT':
            if (player.x - playerSpeed >= worldBounds.left) {  // Ensure player doesn't exceed left bound
                targetX -= playerSpeed;  // Update targetX to the left
                player.setTexture('girl_left');  // Sharp turn to left
            }
            break;
        case 'RIGHT':
            if (player.x + playerSpeed <= worldBounds.right - player.width) {  // Ensure player doesn't exceed right bound
                targetX += playerSpeed;  // Update targetX to the right
                player.setTexture('girl_right');  // Sharp turn to right
            }
            break;
        case 'UP':
            if (player.y - playerSpeed >= worldBounds.top) {  // Ensure player doesn't exceed top bound
                targetY -= playerSpeed;  // Update targetY upward
                player.setTexture('girl_up');  // Sharp turn upward
            }
            break;
        case 'DOWN':
            if (player.y + playerSpeed <= worldBounds.bottom - player.height) {  // Ensure player doesn't exceed bottom bound
                targetY += playerSpeed;  // Update targetY downward
                player.setTexture('girl_down');  // Sharp turn downward
            }
            break;
    }

    lastDirection = currentDirection;  // Update the last direction
}

// Smoothly move the player towards the target position
function movePlayerSmoothly() {
    // Smooth interpolation for player movement
    player.x = Phaser.Math.Linear(player.x, targetX, 0.2);  // Smoothly move to targetX
    player.y = Phaser.Math.Linear(player.y, targetY, 0.2);  // Smoothly move to targetY
}

// Function to scale the player based on window resize
export function scalePlayerOnResize() {
    playerScale = Math.min(window.innerWidth / 600, 1) * 1;  // Ensure the player is 1.5 times bigger
    if (player) {
        player.setScale(playerScale);  // Apply the new scale
    }
}
