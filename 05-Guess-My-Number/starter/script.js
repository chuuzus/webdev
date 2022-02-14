'use strict';

// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = 'Start Guessing Now';
// console.log(document.querySelector('.message').textContent);

// // document.querySelector('.number').textContent = 200;
// document.querySelector('.score').textContent = 200;
// document.querySelector('.guess').value = 23;
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = Number(document.querySelector('.score').textContent);
let highScore = Number(document.querySelector('.highscore').textContent);

const displayMessage = message => {
  document.querySelector('.message').textContent = message;
};

const displayNumber = number => {
  document.querySelector('.number').textContent = number;
};

const displayScore = score => {
  document.querySelector('.score').textContent = score;
};

const displayHighscore = highScore => {
  document.querySelector('.highscore').textContent = highScore;
};

const displayGuess = guess => {
  document.querySelector('.guess').value = guess;
};

// when the 'check!' button is clicked
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // when there is no input
  if (!guess) {
    displayMessage('No Number! 🚫');
  } // when guess is right
  else if (guess === secretNumber) {
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    displayMessage('Correct Guess! ✔');
    displayNumber(guess);

    console.log(`User's guess: ${guess}`);
    console.log(`Actual guess: ${secretNumber}`);
    console.log(`Score: ${score}`);

    // to set our high score
    if (score > highScore) {
      highScore = score;
      displayHighscore(highScore);
    } else {
      displayHighscore(highScore);
    }
  } // when guess is wrong
  else if (guess !== secretNumber) {
    if (score === 1) {
      score--;
      displayMessage(`You Lose! 👎🏽`);
      displayScore(score);
      displayGuess('');
      console.clear();
    } else {
      displayMessage(guess < secretNumber ? `Too Low 📉` : `Too High 📈`);
      score--;
      displayScore(score);
      console.log(`Score: ${score}`);
    }
  } else {
    displayMessage('Enter a valid number ⛔');
  }
});

// when the 'again' button is clicked
document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

  displayMessage('Start guessing...');
  displayNumber('?');
  displayScore(score);
  displayHighscore(highScore);
  displayGuess('');
  console.clear();
});
