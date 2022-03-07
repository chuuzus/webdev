'use strict';

// Elements
const inputMinute = document.querySelector('.form__input--minute');
const inputSecond = document.querySelector('.form__input--second');

const btn = document.querySelector('.form__btn--start');

const timerEL = document.querySelector('.timer');
const labelTimer = document.querySelector('.timer--display');

let timer;

// Function for counting down the timer
const startCountdown = () => {
  // Display the timer
  timerEL.style.opacity = 1;
  labelTimer.style.opacity = 1;

  const m = Number(inputMinute.value);
  const s = Number(inputSecond.value);

  let time = m * 60 + s;
  let halftime = Math.ceil(time / 2);
  let quarterTime = Math.floor(time / 4);

  const tick = () => {
    const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const sec = `${time % 60}`.padStart(2, 0);

    // in each funcion call, log the remaining time to the UI
    labelTimer.textContent = `${min}:${sec}`;

    // when time is at half the initial time, change timer background color to yellow
    if (time < 1) {
      clearInterval(timer);
      inputMinute.value = inputSecond.value = '';
      labelTimer.style.backgroundImage = `linear-gradient(to top left, #000, #000)`;

      setTimeout(() => {
        // Reset the timer
        timerEL.style.opacity = 0;
        labelTimer.style.opacity = 0;
        labelTimer.style.backgroundImage = `linear-gradient(to top left, #52d017, #54c571)`;
        alert(`TIME'S UP`);
      }, 1);
    } else if (time === halftime) {
      console.log(halftime);
      labelTimer.style.backgroundImage = `linear-gradient(to top left, #E9AB17, #D4AF37)`;
    } else if (time === quarterTime) {
      console.log(quarterTime);
      labelTimer.style.backgroundImage = `linear-gradient(to top left, #B21807, #DC381F)`;
    }

    // decrease time by 1 sec
    time--;
  };
  // call timer every second
  const timer = setInterval(tick, 1000);
  tick();
  return timer;
};

// Event Listener for starting the timer
btn.addEventListener('click', e => {
  // Prevent default
  e.preventDefault();

  if (timer) clearInterval(timer);

  // Start Countdown Timer
  startCountdown();
});

labelTimer.addEventListener('click', e => {
  e.preventDefault();
});
