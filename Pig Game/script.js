'use strict';

// selecting elements
const score0El = document.getElementById('score--0'); // player 1 total score
const score1El = document.getElementById('score--1'); // player 2 total score

const btnRoll = document.querySelector('.btn--roll'); // Roll Die button
const btnNew = document.querySelector('.btn--new'); // New Game Button
const btnHold = document.querySelector('.btn--hold'); // Hold current Number button

const diceEl = document.querySelector('.dice'); // die selector

const current0El = document.getElementById('current--0'); // player 1 current score
const current1El = document.getElementById('current--1'); // player 2 current score

const player0El = document.querySelector('.player--0'); // player 1 section
const player1El = document.querySelector('.player--1'); // player 2 section

let playing, scores, currentScore, activePlayer;

// starting conditions
const init = () => {
  playing = true;
  scores = [0, 0]; // scores[0] holds score for player 1, scores[1] holds score for player 2
  currentScore = 0; // setting current score to 0
  activePlayer = 0; // setting active player to player 1

  diceEl.classList.add('hidden');

  score0El.textContent = 0; // resetting player 1 visual total score to 0
  score1El.textContent = 0; // resetting player 2 visual total score to 0
  current0El.textContent = 0; // resetting player 1 visual current score to 0
  current1El.textContent = 0; // resetting player 2 visual current score to 0

  //   scores[0] = 0; // resetting player 1 total score to 0
  //   scores[1] = 0; // resetting player 2 total score to 0

  player0El.classList.add('player--active'); // resetting player 1 section to original color
  player1El.classList.remove('player--active'); // resetting player 2 section to original color
  player0El.classList.remove('player--winner'); // resetting winner
  player1El.classList.remove('player--winner'); // resetting winner
};

init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  console.log(`switching to player ${activePlayer + 1}`);
};

const rollDie = () => {
  if (playing) {
    // generate random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dice);

    //  display a different die face, based on the random number generated
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // checcking for rolled die, 1:
    if (dice === 1) {
      // switch to next player
      switchPlayer();
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // add die value to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
};

// Rolling die functionality
btnRoll.addEventListener('click', rollDie);

const holdScore = () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceEl.classList.add('hidden');
      //   btnRoll.removeEventListener('click', rollDie);
      //   btnHold.removeEventListener('click', holdScore);
      console.log('Game Over.');
    } else {
      switchPlayer();
    }
  }
};

// holding score functionality
btnHold.addEventListener('click', holdScore);

const reset = () => {
  init();
  console.log('Resettig the game.');
};

// reseting the game functionality
btnNew.addEventListener('click', reset);
