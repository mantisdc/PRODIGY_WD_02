// Updated script.js
let startTime = 0;
let lapTime = 0;
let isRunning = false;
let lapNumber = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('lapList');

function updateDisplay() {
    const currentTime = Date.now() - startTime;
    display.textContent = formatTime(currentTime);
}

function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(11, 8);
}

startStopBtn.addEventListener('click', function () {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Resume';
        display.style.color = '#e74c3c'; // Change display color on pause
    } else {
        startTime += Date.now() - lapTime;
        timer = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Pause';
        display.style.color = '#2ecc71'; // Change display color on resume
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', function () {
    clearInterval(timer);
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    lapBtn.textContent = 'Lap';
    lapList.innerHTML = '';
    isRunning = false;
    startTime = 0;
    lapTime = 0;
    lapNumber = 1;
    display.style.color = '#000'; // Reset display color
});

lapBtn.addEventListener('click', function () {
    if (isRunning) {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapNumber}: ${formatTime(Date.now() - lapTime)}`;
        lapList.appendChild(lapItem);
        lapNumber++;
        lapTime = Date.now();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        startStopBtn.click();
    } else if (event.key === 'r' || event.key === 'R') {
        resetBtn.click();
    }
});

let timer;
