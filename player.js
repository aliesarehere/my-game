import { speedSettings } from './speed.js';  // Import speed settings

export let player, lastDirection = 'RIGHT', currentDirection = 'RIGHT', lastMoveTime = 0;
const playerSpeed = speedSettings.playerSpeed, moveDelay = speedSettings.moveDelay;

// Preload player sprites
export function preloadPlayer(scene) {
    scene.load.image('girl_up', 'assets/rymmaup2.png');
    scene.load.image('girl_down', 'assets/rymmadown2.png');
    scene.load.image('girl_left', 'assets/rymmaleft2.png');
    scene.load.image('girl_right', 'assets/rymmaright2.png');
}

// Create player sprite in the game
export function createPlayer(scene) {
    player = scene.physics.add.sprite(240, 400, 'girl_right').setOrigin(0);
    player.setCollideWorldBounds(true);  // Prevent leaving the screen
}

// Update player movement
export function updatePlayer(scene, cursors) {
    if (cursors.left.isDown && lastDirection !== 'RIGHT') {
        currentDirection = 'LEFT';
    } else if (cursors.right.isDown && lastDirection !== 'LEFT') {
        currentDirection = 'RIGHT';
    } else if (cursors.up.isDown && lastDirection !== 'DOWN') {
        currentDirection = 'UP';
    } else if (cursors.down.isDown && lastDirection !== 'UP') {
        currentDirection = 'DOWN';
    }

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