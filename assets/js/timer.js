// Retrieves IDs of the timer elements
const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');

const timerCircle = document.getElementById('timer-circle');
const totalTime = 25 * 60;

let timeLeft = 25 * 60;
let timerInterval;

startButton.addEventListener("click", function () {
    // Clears the old interval before starting a new one
    clearInterval(timerInterval);

    timerInterval = setInterval(function () {
        timeLeft--;

        // Calculates progress of the timer
        let progress = (timeLeft / totalTime) * 100;
        timerCircle.style.background = `conic-gradient(#e9b6c8 ${progress}%, #f5dce5 ${progress}%)`;

        // Timer stops at 00:00, has to be put before the Math.floor so the timer never goes negative
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeLeft = 0;
            timerDisplay.textContent = "00:00";
            return;
        }

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        seconds = seconds.toString().padStart(2, '0');
        timerDisplay.textContent = minutes + ":" + seconds;
    }, 1000);
});

pauseButton.addEventListener("click", function () {
    clearInterval(timerInterval);
});

resetButton.addEventListener("click", function () {
    clearInterval(timerInterval);
    timeLeft = 25 * 60;
    timerDisplay.textContent = "25:00";

    timerCircle.style.background =
        "conic-gradient(#e9b6c8 100%, #f5dce5 100%)";
});


