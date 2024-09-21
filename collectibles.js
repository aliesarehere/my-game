import { player } from './player.js';  // Import the player object
import { growTail } from './tail.js';   // Import the growTail function from tail.js

let diamonds = [];
let moneyBags = [];
let diamondSpawned = false, moneySpawned = false;
let collectibleScale = 0.7;  // Scale for collectibles, slightly smaller than player

// Function to create initial collectibles
export function createCollectibles(scene) {
    spawnCollectible(scene, 'diamond', scene);
    spawnCollectible(scene, 'money', scene);
}

// Function to spawn new collectibles
export function spawnCollectible(scene, type) {
    const tileSize = 15;  // Size of each tile in the game grid
    let x = Phaser.Math.Between(0, 23) * tileSize;
    let y = Phaser.Math.Between(0, 39) * tileSize;

    if (type === 'diamond' && !diamondSpawned) {
        let diamond = scene.physics.add.sprite(x, y, 'diamond').setOrigin(0).setScale(collectibleScale);
        diamonds.push(diamond);
        diamondSpawned = true;
        scene.physics.add.overlap(player, diamond, () => collectDiamond(scene, diamond), null, scene);
    } else if (type === 'money' && !moneySpawned) {
        let money = scene.physics.add.sprite(x, y, 'money').setOrigin(0).setScale(collectibleScale);
        moneyBags.push(money);
        moneySpawned = true;
        scene.physics.add.overlap(player, money, () => collectMoney(scene, money), null, scene);
    }
}

// Function to handle the collection of diamonds
export function collectDiamond(scene, diamond) {
    if (diamond.active) {
        diamond.disableBody(true, true);
        scene.score += 30;
        scene.scoreText.setText('Score: ' + scene.score);
        diamondSpawned = false;
        scene.time.delayedCall(1000, () => {
            spawnCollectible(scene, 'diamond');
        });
        growTail(scene);
    }
}

// Function to handle the collection of money
export function collectMoney(scene, money) {
    if (money.active) {
        money.disableBody(true, true);
        scene.score += 10;
        scene.scoreText.setText('Score: ' + scene.score);
        moneySpawned = false;
        scene.time.delayedCall(1000, () => {
            spawnCollectible(scene, 'money');
        });
        growTail(scene);
    }
}
