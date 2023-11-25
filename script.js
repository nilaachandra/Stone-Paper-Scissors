// Retrieve score from localStorage, or set default if not present
let score = JSON.parse(localStorage.getItem('score'));

/* Since localStorage will throw a null value because we removed the score in the reset button 
   because it doesn't exist anymore, to solve, we will give a default below as follows */
if (score === null) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0,
    }
}
updateScoreElement();
// Function to play the game based on the player's move
function playGame(playerMove) {
    const computerMove = pickComputerMove(); // Get the computer's move
    let result = '';

    // Determine the result of the game based on player and computer moves
    if (playerMove === 'Scissors') {
        if (computerMove === 'Rock') {
            result = 'You lose';
        } else if (computerMove === 'Paper') {
            result = 'You win';
        } else if (computerMove === 'Scissors') {
            result = 'Tie';
        }
    } else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
            result = 'You win';
        } else if (computerMove === 'Paper') {
            result = 'Tie';
        } else if (computerMove === 'Scissors') {
            result = 'You lose';
        }
    } else if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
            result = 'Tie';
        } else if (computerMove === 'Paper') {
            result = 'You lose';
        } else if (computerMove === 'Scissors') {
            result = 'You win';
        }
    }

    // Update scores and store in localStorage
    if (result === 'You win') {
        score.wins += 1;
    } else if (result === 'You lose') {
        score.losses += 1;
    } else if (result === 'Tie') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score)); // Save updated scores in localStorage

    updateScoreElement();

    document.querySelector('.js-results').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You<img src="./${playerMove}-emoji.png" class="move-icon"> <img src="./${computerMove}-emoji.png" class="move-icon">Computer`;


    // Display game result and scores in an alert
    `You picked ${playerMove}. Computer picked ${computerMove}. ${result}. 
Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
// Function to randomly pick the computer's move
function pickComputerMove() {
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        return 'Rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        return 'Paper';
    } else {
        return 'Scissors';
    }
}
