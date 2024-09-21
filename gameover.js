export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.finalScore = data.score;  // Receive the final score from the previous scene
    }

    preload() {
        // Load the HTML for the form
        this.load.html('nameform', 'assets/nameform.html');
    }

    create() {
        // Display the game over message and score
        this.add.text(240, 100, `Game Over! Your score: ${this.finalScore}`, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Create the DOM element for the form
        let nameForm = this.add.dom(240, 200).createFromCache('nameform').setOrigin(0.5);

        // Add listener to submit button
        nameForm.addListener('click');
        nameForm.on('click', (event) => {
            if (event.target.name === 'submit') {
                let inputText = nameForm.getChildByName('name');
                if (inputText.value !== '') {
                    // Save the name and score (you can later save it to local storage or a database)
                    this.saveScore(inputText.value, this.finalScore);
                }
            }
        });

        // Create the "Continue" button to refresh the page
        const continueButton = this.add.text(240, 350, 'Continue', { fontSize: '32px', fill: '#fff' })
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
