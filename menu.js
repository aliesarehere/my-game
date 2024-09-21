export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        // Load any background or assets needed for the menu
        this.load.image('background', 'assets/background.png');
        
        // Load the background music for the menu
        this.load.audio('menuMusic', 'assets/level1-step1.wav');
    }

    create() {
        // Add the background for the menu
        this.add.image(240, 400, 'background').setDisplaySize(480, 800);

        // Play the background music in a loop
        let music = this.sound.add('menuMusic');
        music.play({ loop: true });

        // Create a "Start Game" button with hover effects
        const startButton = this.add.text(240, 350, 'Start Game', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                music.stop();  // Stop music when game starts
                this.scene.start('GameScene');  // Switch to GameScene when clicked
            })
            .on('pointerover', () => startButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => startButton.setStyle({ fill: '#fff' }));

        // Create a "High Scores" button (placeholder for future use)
        const highScoreButton = this.add.text(240, 400, 'High Scores', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                console.log('High Scores functionality coming soon...');
            })
            .on('pointerover', () => highScoreButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => highScoreButton.setStyle({ fill: '#fff' }));

        // Create an "Invite Friends" button
        const inviteButton = this.add.text(240, 450, 'Invite Friends (Telegram)', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                window.open('https://t.me/share/url?url=YourGameLinkHere', '_blank');
            })
            .on('pointerover', () => inviteButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => inviteButton.setStyle({ fill: '#fff' }));

        // Create an "Instructions" button to show game controls
        const instructionsButton = this.add.text(240, 500, 'Instructions', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.showInstructions();  // Show instructions when clicked
            })
            .on('pointerover', () => instructionsButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => instructionsButton.setStyle({ fill: '#fff' }));
    }

    // Function to show the game instructions
    showInstructions() {
        // Display instructions text
        const instructionsText = this.add.text(240, 300, 
            'Use arrow keys to move.\nCollect diamonds and money.\nAvoid hitting your tail.', 
            { fontSize: '24px', fill: '#fff', align: 'center' })
            .setOrigin(0.5);

        // Create a "Back" button to return to the menu
        const backButton = this.add.text(240, 550, 'Back to Menu', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                instructionsText.destroy();  // Remove the instructions text
                backButton.destroy();  // Remove the back button
            })
            .on('pointerover', () => backButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => backButton.setStyle({ fill: '#fff' }));
    }
}
