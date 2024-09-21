import { player, currentDirection } from './player.js';  // Import the player object and currentDirection
import { speedSettings } from './speed.js';  // Import speed settings

export let tail = [];  // Export the tail array
const { tailSpeed, tailFollowDistance } = speedSettings;  // Use speed and distance settings from speed.js

let playerSize = 60;  // Define player size (60x60 pixels)
let positionsBuffer = [];  // Buffer to store previous positions for the tail
let tailScale = 0.6;  // Scale for tail segment size, making the tail larger than collectibles

// Function to grow the tail when a collectible is picked up
export function growTail(scene) {  
    tailScale = Math.min(window.innerWidth / 800, 1) * 1.5;  // Adjust the scale based on the screen size and apply larger scaling for the tail
    let newTailSegment;

    if (tail.length === 0) {
        // First tail segment follows directly behind the player, opposite to the player's direction
        let spawnX = player.x;
        let spawnY = player.y;

        switch (currentDirection) {
            case 'LEFT':
                spawnX = player.x + player.displayWidth;  // Respect player scaling
                break;
            case 'RIGHT':
                spawnX = player.x - player.displayWidth;
                break;
            case 'UP':
                spawnY = player.y + player.displayHeight;
                break;
            case 'DOWN':
                spawnY = player.y - player.displayHeight;
                break;
        }
        // Add the first segment right behind the player
        newTailSegment = scene.add.sprite(spawnX, spawnY, 'bag').setOrigin(0).setScale(tailScale);
    } else {
        // Create subsequent segments at the last tail segment's position
        let lastTailSegment = tail[tail.length - 1];
        newTailSegment = scene.add.sprite(lastTailSegment.x, lastTailSegment.y, 'bag').setOrigin(0).setScale(tailScale);
    }

    // Add the new segment to the tail array
    tail.push(newTailSegment);
    console.log("New tail segment added. Total segments: ", tail.length);
}

// Update the tail movement to maintain proper distance based on 60x60 object sizes
export function updateTail() {
    // Store the current player position in the buffer
    positionsBuffer.unshift({ x: player.x, y: player.y });

    // Limit the size of the buffer to only hold as many positions as required by the tail segments
    const bufferSize = (tail.length + 1) * tailFollowDistance;
    if (positionsBuffer.length > bufferSize) {
        positionsBuffer.pop();  // Remove old positions from the buffer
    }

    // Update the position of each tail segment by using the buffered positions
    for (let i = 0; i < tail.length; i++) {
        const tailPositionIndex = (i + 1) * tailFollowDistance;  // Each segment follows at a set distance

        // Ensure we have enough positions in the buffer for each tail segment
        if (positionsBuffer[tailPositionIndex]) {
            let targetPosition = positionsBuffer[tailPositionIndex];
            let currentSegment = tail[i];

            // Smoothly move the tail segment to the target position
            currentSegment.x = Phaser.Math.Linear(currentSegment.x, targetPosition.x, 0.1);
            currentSegment.y = Phaser.Math.Linear(currentSegment.y, targetPosition.y, 0.1);
        }
    }
}

// Function to check for collisions between the player and their own tail
export function checkTailCollision(scene) {
    let playerRect = player.getBounds();

    // Start checking from the second segment (tail[2] and onwards)
    for (let i = 2; i < tail.length; i++) {
        let tailRect = tail[i].getBounds();
        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, tailRect)) {
            console.log('Tail collision! Restarting game...');
            scene.scene.start('GameOverScene', { score: scene.score });  // Switch to GameOverScene and pass the score
        }
    }
}
