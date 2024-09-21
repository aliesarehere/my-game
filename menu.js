export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        // Load any background or assets needed for the menu
        this.load.image('background', 'assets/background.png');
        
        // Load the background music for the menu (will persist throughout the game)
        this.load.audio('menuMusic', 'assets/level1-step1.wav');
    }

    create() {
        // Add and scale the background to fit the screen
        this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background').setDisplaySize(window.innerWidth, window.innerHeight);

        // Check if the music is already playing to avoid restarting it
        if (!this.sound.get('menuMusic')) {
            // Play the background music in a loop
            let music = this.sound.add('menuMusic', { loop: true });
            music.play();
        }

        // Calculate dynamic font size based on screen dimensions
        const baseFontSize = Math.min(window.innerWidth, window.innerHeight) * 0.05;  // 5% of the smaller screen dimension

        // Create a "Start Game" button with hover effects, and scale the text
        const startButton = this.add.text(window.innerWidth / 2, window.innerHeight / 2 - 100, 'Start Game', {
            fontSize: `${baseFontSize}px`,
            fill: '#fff'
        })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('GameScene');  // Switch to GameScene when clicked, music continues playing
        })
        .on('pointerover', () => startButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => startButton.setStyle({ fill: '#fff' }));

        // Create a "High Scores" button (placeholder for future use)
        const highScoreButton = this.add.text(window.innerWidth / 2, window.innerHeight / 2, 'High Scores', {
            fontSize: `${baseFontSize}px`,
            fill: '#fff'
        })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            console.log('High Scores functionality coming soon...');
        })
        .on('pointerover', () => highScoreButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => highScoreButton.setStyle({ fill: '#fff' }));

        // Create an "Invite Friends" button with scaling
        const inviteButton = this.add.text(window.innerWidth / 2, window.innerHeight / 2 + 100, 'Invite Friends (Telegram)', {
            fontSize: `${baseFontSize}px`,
            fill: '#fff'
        })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            window.open('https://t.me/share/url?url=YourGameLinkHere', '_blank');
        })
        .on('pointerover', () => inviteButton.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => inviteButton.setStyle({ fill: '#fff' }));

        // Create an "Instructions" button with scaling
        const instructionsButton = this.add.text(window.innerWidth / 2, window.innerHeight / 2 + 200, 'Instructions', {
            fontSize: `${baseFontSize}px`,
            fill: '#fff'
        })
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
        // Calculate dynamic font size for instructions text
        const instructionsFontSize = Math.min(window.innerWidth, window.innerHeight) * 0.04;  // 4% of the smaller screen dimension

        // Display instructions text with scaling
        const instructionsText = this.add.text(window.innerWidth / 2, window.innerHeight / 2 - 100, 
            'Use arrow keys to move.\nCollect diamonds and money.\nAvoid hitting your tail.', 
            { fontSize: `${instructionsFontSize}px`, fill: '#fff', align: 'center' })
            .setOrigin(0.5);

        // Create a "Back to Menu" button with scaling
        const backButton = this.add.text(window.innerWidth / 2, window.innerHeight / 2 + 150, 'Back to Menu', {
            fontSize: `${instructionsFontSize}px`,
            fill: '#fff'
        })
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
