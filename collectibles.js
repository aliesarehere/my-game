import { player } from './player.js';  // Import the player object
import { growTail } from './tail.js';   // Import the growTail function from tail.js

let diamonds = [];
let moneyBags = [];
let diamondSpawned = false, moneySpawned = false;

// Function to create initial collectibles (one diamond and one money)
export function createCollectibles(scene) {
    spawnCollectible(scene, 'diamond', scene);
    spawnCollectible(scene, 'money', scene);
}

// Function to spawn new collectibles (diamonds or money) randomly on the map
export function spawnCollectible(scene, type) {
    const tileSize = 15;  // Size of each tile in the game grid
    let x = Phaser.Math.Between(0, 23) * tileSize;  // Random x-coordinate
    let y = Phaser.Math.Between(0, 39) * tileSize;  // Random y-coordinate

    // Spawn a diamond if none is currently active
    if (type === 'diamond' && !diamondSpawned) {
        let diamond = scene.physics.add.sprite(x, y, 'diamond').setOrigin(0);  // Create diamond sprite
        diamonds.push(diamond);  // Add the diamond to the array of diamonds
        diamondSpawned = true;  // Mark that a diamond has been spawned
        // Add overlap detection to collect the diamond when the player touches it
        scene.physics.add.overlap(player, diamond, () => collectDiamond(scene, diamond), null, scene);
    }

    // Spawn a money bag if none is currently active
    else if (type === 'money' && !moneySpawned) {
        let money = scene.physics.add.sprite(x, y, 'money').setOrigin(0);  // Create money sprite
        moneyBags.push(money);  // Add the money to the array of money
        moneySpawned = true;  // Mark that a money bag has been spawned
        // Add overlap detection to collect the money when the player touches it
        scene.physics.add.overlap(player, money, () => collectMoney(scene, money), null, scene);
    }
}

// Function to handle the collection of diamonds
export function collectDiamond(scene, diamond) {
    if (diamond.active) {
        diamond.disableBody(true, true);  // Disable and hide the diamond when collected
        scene.score += 30;  // Increase score by 30 for collecting a diamond
        scene.scoreText.setText('Score: ' + scene.score);  // Update score display
        diamondSpawned = false;  // Mark diamond as no longer active

        // Delay for 1 second before spawning a new diamond
        scene.time.delayedCall(1000, () => {
            spawnCollectible(scene, 'diamond');  // Respawn a new diamond
        });

        growTail(scene);  // Call the function to grow the player's tail, pass the scene object
    }
}

// Function to handle the collection of money
export function collectMoney(scene, money) {
    if (money.active) {
        money.disableBody(true, true);  // Disable and hide the money when collected
        scene.score += 10;  // Increase score by 10 for collecting money
        scene.scoreText.setText('Score: ' + scene.score);  // Update score display
        moneySpawned = false;  // Mark money as no longer active

        // Delay for 1 second before spawning new money
        scene.time.delayedCall(1000, () => {
            spawnCollectible(scene, 'money');  // Respawn new money
        });

        growTail(scene);  // Call the function to grow the player's tail, pass the scene object
    }
}
