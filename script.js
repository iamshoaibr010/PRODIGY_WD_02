// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const laps = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        startStopBtn.innerHTML = "Pause";
        running = true;
        resetBtn.disabled = true;
    } 
    else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.innerHTML = "Start";
        resetBtn.disabled = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    display.innerHTML = "00:00:00";
    startStopBtn.innerHTML = "Start";
    resetBtn.disabled = false;
    laps.innerHTML = "";
    lapCounter = 0;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    display.innerHTML = 
        (hours < 10 ? "0" + hours : hours) + ":" + 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds < 10 ? "0" + seconds : seconds);

    addLap(milliseconds);
}

function addLap(milliseconds) {
    if (milliseconds === 0 && running) {
        let lapTime = display.innerHTML;
        lapCounter++;
        let lapItem = document.createElement('li');
        lapItem.innerHTML = 'Lap ${lapCounter}; ${lapTime}';
        laps.appendChild(lapItem);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);