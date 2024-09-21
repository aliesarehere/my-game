import { speedSettings } from './speed.js';  // Import speed settings

export let player, lastDirection = 'RIGHT', currentDirection = 'RIGHT', lastMoveTime = 0;  // Export currentDirection
const playerSpeed = speedSettings.playerSpeed, moveDelay = speedSettings.moveDelay;
let playerScale = 1;  // New variable to store player scale

// Preload player sprites
export function preloadPlayer(scene) {
    scene.load.image('girl_up', 'assets/rymmaup2.png');
    scene.load.image('girl_down', 'assets/rymmadown2.png');
    scene.load.image('girl_left', 'assets/rymmaleft2.png');
    scene.load.image('girl_right', 'assets/rymmaright2.png');
}

// Create player sprite in the game
export function createPlayer(scene) {
    // Set player size relative to collectibles
    playerScale = Math.min(window.innerWidth / 600, 1);  // Adjust scaling compared to collectibles, slightly larger
    player = scene.physics.add.sprite(240, 400, 'girl_right').setOrigin(0).setScale(playerScale);
    player.setCollideWorldBounds(true);  // Prevent leaving the screen
}

// Update player movement
export function updatePlayer(scene, cursors, touchDirection = null) {
    if (!cursors || !cursors.left || !cursors.right || !cursors.up || !cursors.down) {
        return;
    }

    // Handle touch or keyboard input
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

    // Move player based on the time delay
    if (scene.time.now - lastMoveTime > moveDelay) {
        movePlayer(scene);
        lastMoveTime = scene.time.now;
    }
}

// Move the player according to direction
export function movePlayer(scene) {
    switch (currentDirection) {
        case 'LEFT':
            player.x -= playerSpeed;
            player.setTexture('girl_left');
            break;
        case 'RIGHT':
            player.x += playerSpeed;
            player.setTexture('girl_right');
            break;
        case 'UP':
            player.y -= playerSpeed;
            player.setTexture('girl_up');
            break;
        case 'DOWN':
            player.y += playerSpeed;
            player.setTexture('girl_down');
            break;
    }

    lastDirection = currentDirection;
}

// Function to scale the player based on window resize
export function scalePlayerOnResize() {
    playerScale = Math.min(window.innerWidth / 600, 1);  // Adjust the scale
    if (player) {
        player.setScale(playerScale);  // Apply the new scale
    }
}
