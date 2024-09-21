import { player, currentDirection } from './player.js';  // Import the player object and currentDirection
import { speedSettings } from './speed.js';  // Import speed settings

export let tail = [];
const { tailSpeed, tailFollowDistance } = speedSettings;

let playerSize = 60;  // Define player size (60x60 pixels)
let positionsBuffer = [];
let tailScale = 0.7;  // Scale for tail segment size

// Function to grow the tail when a collectible is picked up
export function growTail(scene) {
    let newTailSegment;

    if (tail.length === 0) {
        let spawnX = player.x;
        let spawnY = player.y;

        switch (currentDirection) {
            case 'LEFT':
                spawnX = player.x + playerSize;
                break;
            case 'RIGHT':
                spawnX = player.x - playerSize;
                break;
            case 'UP':
                spawnY = player.y + playerSize;
                break;
            case 'DOWN':
                spawnY = player.y - playerSize;
                break;
        }
        newTailSegment = scene.add.sprite(spawnX, spawnY, 'bag').setOrigin(0).setScale(tailScale);
    } else {
        let lastTailSegment = tail[tail.length - 1];
        newTailSegment = scene.add.sprite(lastTailSegment.x, lastTailSegment.y, 'bag').setOrigin(0).setScale(tailScale);
    }

    tail.push(newTailSegment);
    console.log("New tail segment added. Total segments: ", tail.length);
}

// Update the tail movement to maintain proper distance
export function updateTail() {
    positionsBuffer.unshift({ x: player.x, y: player.y });

    const bufferSize = (tail.length + 1) * tailFollowDistance;
    if (positionsBuffer.length > bufferSize) {
        positionsBuffer.pop();
    }

    for (let i = 0; i < tail.length; i++) {
        const tailPositionIndex = (i + 1) * tailFollowDistance;
        if (positionsBuffer[tailPositionIndex]) {
            let targetPosition = positionsBuffer[tailPositionIndex];
            let currentSegment = tail[i];

            currentSegment.x = Phaser.Math.Linear(currentSegment.x, targetPosition.x, 0.1);
            currentSegment.y = Phaser.Math.Linear(currentSegment.y, targetPosition.y, 0.1);
        }
    }
}

// Function to check for collisions between the player and their own tail
export function checkTailCollision(scene) {
    let playerRect = player.getBounds();

    for (let i = 2; i < tail.length; i++) {
        let tailRect = tail[i].getBounds();
        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, tailRect)) {
            console.log('Tail collision! Restarting game...');
            scene.scene.start('GameOverScene', { score: scene.score });
        }
    }
}
