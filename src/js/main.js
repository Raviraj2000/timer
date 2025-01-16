/****************************************
 * Timer Logic
 ****************************************/
let timeLeft = 300; // 5 minutes
let timerInterval = null;
let isTimerRunning = false;

const timerSection = document.getElementById("timer-section");
const timeDisplay = document.getElementById("time-display");
const playPauseBtn = document.getElementById("play-pause-btn");
const timeButtons = document.querySelectorAll(".time-btn");

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  if (isTimerRunning) return;
  isTimerRunning = true;
  playPauseBtn.textContent = "⏸";

  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      playPauseBtn.textContent = "▶";
      isTimerRunning = false;
      alert("Time's up!");
    }
    updateTimerDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  playPauseBtn.textContent = "▶";
}

playPauseBtn.addEventListener("click", () => {
  if (isTimerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

timeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const secondsToAdd = parseInt(button.dataset.addSeconds, 10);
    timeLeft += secondsToAdd;
    updateTimerDisplay();
  });
});

/****************************************
 * Stopwatch Logic
 ****************************************/
let stopwatchTime = 0;
let stopwatchInterval = null;
let isStopwatchRunning = false;

const stopwatchSection = document.getElementById("stopwatch-section");
const stopwatchDisplay = document.getElementById("stopwatch-display");
const startStopwatchBtn = document.getElementById("start-stopwatch");
const resetStopwatchBtn = document.getElementById("reset-stopwatch");

function updateStopwatchDisplay() {
  const minutes = Math.floor(stopwatchTime / 60000); // Total minutes
  const seconds = Math.floor((stopwatchTime % 60000) / 1000); // Remaining seconds

  // Update the display (e.g., "01:23.45")
  stopwatchDisplay.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function startStopwatch() {
  if (isStopwatchRunning) return;
  isStopwatchRunning = true;
  startStopwatchBtn.textContent = "⏸";

  const startTime = Date.now();
  stopwatchInterval = setInterval(() => {
    stopwatchTime += Date.now() - startTime;
    updateStopwatchDisplay();
  }, 1000);
}

function pauseStopwatch() {
  clearInterval(stopwatchInterval);
  isStopwatchRunning = false;
  startStopwatchBtn.textContent = "▶";
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  isStopwatchRunning = false;
  startStopwatchBtn.textContent = "▶";
  updateStopwatchDisplay();
}

startStopwatchBtn.addEventListener("click", () => {
  if (isStopwatchRunning) {
    pauseStopwatch();
  } else {
    startStopwatch();
  }
});

resetStopwatchBtn.addEventListener("click", resetStopwatch);

/****************************************
 * Tab Switching Logic
 ****************************************/
const timerTab = document.getElementById("timer-tab");
const stopwatchTab = document.getElementById("stopwatch-tab");

timerTab.addEventListener("click", () => {
  timerTab.classList.add("active");
  stopwatchTab.classList.remove("active");
  timerSection.style.display = "block";
  stopwatchSection.style.display = "none";
});

stopwatchTab.addEventListener("click", () => {
  stopwatchTab.classList.add("active");
  timerTab.classList.remove("active");
  stopwatchSection.style.display = "block";
  timerSection.style.display = "none";
});
