export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.finalScore = data.score;  // Receive the final score from the previous scene
    }

    preload() {
        // Load the HTML for the form and a background image
        this.load.html('nameform', 'assets/nameform.html');
        this.load.image('gameover_bg', 'assets/background.png');  // Preload a background image for the game over screen
    }

    create() {
        // Add and scale the background image
        this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'gameover_bg').setDisplaySize(window.innerWidth, window.innerHeight);

        // Display the game over message and score in the center of the screen
        this.add.text(window.innerWidth / 2, window.innerHeight / 2 - 100, `Game Over! Your score: ${this.finalScore}`, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Create the DOM element for the form and center it
        let nameForm = this.add.dom(window.innerWidth / 2, window.innerHeight / 2).createFromCache('nameform').setOrigin(0.5);

        // Add listener to the submit button in the form
        nameForm.addListener('click');
        nameForm.on('click', (event) => {
            if (event.target.name === 'submit') {
                let inputText = nameForm.getChildByName('name');
                if (inputText.value !== '') {
                    // Save the name and score (could be local storage or a database)
                    this.saveScore(inputText.value, this.finalScore);
                }
            }
        });

        // Create the "Continue" button to refresh the page and center it
        const continueButton = this.add.text(window.innerWidth / 2, window.innerHeight / 2 + 150, 'Continue', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                location.reload();  // Refresh the page to restart the game
            })
            .on('pointerover', () => continueButton.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => continueButton.setStyle({ fill: '#fff' }));
    }

    saveScore(name, score) {
        console.log(`Player name: ${name}, Score: ${score}`);
        // Implement actual saving logic (e.g., local storage, database, etc.)
    }
}
