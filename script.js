`use strict`;

let player0El = document.querySelector(`.player--0`);
let player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.querySelector(`#score--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
const current0El = document.querySelector(`#current--0`);
const current1El = document.querySelector(`#current--1`);

let playing, totalScore, currentScore, activePlayer;

let init = function () {
  playing = true;
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  // Reset player scores
  score0El.textContent = 0;
  score1El.textContent = 0;

  // Hide the dice at the start of a new game
  diceEl.classList.add(`hidden`);
  
  // Make player 0 the active player
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  
  // Remove the active and winner class from player 1
  player1El.classList.remove('player--active', 'player--winner');

  // Reset current scores to 0 for both players
  current0El.textContent = 0;
  current1El.textContent = 0;
};

init();

let switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

btnRoll.addEventListener(`click`, function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    totalScore[activePlayer] += currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    if (totalScore[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);

      // Display winner prompt
      alert(`Player ${activePlayer + 1} wins! 🎉`);
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener(`click`, init);
