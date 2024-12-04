const fig = document.getElementById("fig");
const timeTaken = document.getElementById("timeTaken");
const bestTimeElement = document.getElementById("lowestTime");
const startPage = document.getElementById("startPage");
const gamePage = document.getElementById("gamePage");
const endPage = document.getElementById("endPage");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const finalBestTimeElement = document.getElementById("finalBestTime");
const totalTapsElement = document.getElementById("totalTaps"); // New element for total taps

let start = new Date().getTime();
let reflexTimes = [];
let totalTaps = 0; // New variable to track total taps
let gameTimer;  // Timer for the 30-second game duration
let timerInterval; // Timer interval for countdown
let timeLeft = 30; // Timer for the game

// Function to change color of the figure
const figureColor = () => {
    const colorArray = '0123456789ABCDEF';
    let hash = '#';
    for (let i = 0; i < 6; i++) {
        hash += colorArray[Math.floor(Math.random() * 16)];
    }
    fig.style.backgroundColor = hash;
};

// Function to change t
// Function to change the figure shape
const figureShape = (size) => {
    start = new Date().getTime();
    const choice = Math.floor(Math.random() * 2);
    fig.style.width = ${size}px;
    fig.style.height = ${size}px;
    fig.style.borderRadius = choice === 0 ? "50%" : "0";
};

// Function to update and display the best (lowest) reflex time
const updateBestTime = () => {
    if (reflexTimes.length > 0) { // Only update if there are reflex times
        let bestTime = Math.min(...reflexTimes);  // Find the best time
        bestTimeElement.textContent = Best Time: ${bestTime}s;
        localStorage.setItem('bestReflexTime', bestTime); // Save to local storage
    }
};

// Function to update the timer display
const updateTimer = () => {
    const timeLeftElement = document.getElementById("timeLeft");
    timeLeftElement.textContent = timeLeft; // Update the timer display
};

// Function to show the end page and best time
const endGame = () => {
    const bestTime = Math.min(...reflexTimes);
    finalBestTimeElement.textContent = ${bestTime}s;  // Update best time in the end page
    totalTapsElement.textContent = totalTaps; // Display total taps

    // Switch to end page
    gamePage.classList.remove("active");
    endPage.classList.add("active");

    reflexTimes = [];  // Reset reflex times
    totalTaps = 0; // Reset total taps
    clearTimeout(gameTimer);
    clearInterval(timerInterval); // Clear the timer interval
};

// Start the game
const startGame = () => {
    timeLeft = 30; // Reset the timer
    updateTimer(); // Display the initial timer value
    startPage.classList.remove("active");
    gamePage.classList.add("active");

    gameTimer = setTimeout(endGame, 30000);  // End game after 30 seconds

    // Start the countdown timer
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000); // Update every second
};

// Restart the game
const restartGame = () => {
    endPage.classList.remove("active");
    startPage.classList.add("active");
};

// Event listener to start the game when the start button is clicked
startButton.addEventListener("click", startGame);

// Event listener to restart the game when the restart button is clicked
restartButton.addEventListener("click", restartGame);

// Event listener to change the figure properties once it is clicked
fig.addEventListener("click", () => {
    const end = new Date().getTime();
    const reactionTime = (end - start) / 1000;

    timeTaken.innerHTML = reactionTime;

    reflexTimes.push(reactionTime);
    totalTaps++; // Increment total taps
    updateBestTime();

    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);
    const size = Math.floor(Math.random() * 100) + 50;
    figurePosition(top, left);
    figureShape(size);
    figureColor();
});

// On page load, display the saved best time
document.addEventListener("DOMContentLoaded", () => {
    const savedBestTime = localStorage.getItem('bestReflexTime');
    if (savedBestTime) {
        bestTimeElement.textContent = Best Time: ${savedBestTime}s;
    }
})