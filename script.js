window.addEventListener("load", init);

// Default vars
let time = 5;
let score = 0;
let gamesPlayed = 0;
let highestScore = 0;
let gameStarted = false;
let gameEnd = false;

const wordInput = document.getElementById("input-word");
const currentWord = document.getElementById("word");
const currentScore = document.getElementById("score");
const highScore = document.getElementById("highest-score");
const currentTime = document.getElementById("time");
const message = document.getElementById("message");

const words = ["chris", "archie", "sian", "winston", "hobnob", "sofa"];

// Initialize game
function init() {
    wordInput.addEventListener("input", checkInput);

    wordInput.addEventListener("focus", startInitiated);

    // Reduce time
    setInterval(countdown, 1000);
}

function startInitiated() {
    console.log("initial");
    if (!gameStarted) {
        gameStart();
    }
}

function gameStart() {
    // check if the input has been focused on
    console.info("--Initiate game start--");
    if (gameStarted === false) {
        gameStarted = true;
        time = 5;
        gamesPlayed++;
        showWord(); // Generate first random word
        defaultState();
    }
}

function defaultState() {
    currentTime.innerHTML = "Starting...";
    currentScore.innerHTML = score;
}

function endState() {
    gameStarted = false;
    message.innerHTML = "Game over!";
    wordInput.blur();
    if (score > highestScore) {
        highestScore = score;
        highScore.innerHTML = highestScore + " - games played: " + gamesPlayed;
    }
    score = 0;
}

function countdown() {
    if (time > 0 && gameStarted) {
        time--;
    } else if (time === 0) {
        gameStarted = false;
        endState();
    }
    if (gameStarted) {
        currentTime.innerHTML = time;
    }
}

// Select new word
function showWord() {
    // select random number based on array length
    const rand = Math.floor(Math.random() * words.length);

    currentWord.innerHTML = words[rand];
}

function checkInput() {
    if (gameEnd) {
        message.innerHTML = "";
        gameStart = false;
    }

    if (matchWords()) {
        time = 6;
        showWord();
        wordInput.value = "";
        incrementScore();
    }
}

function incrementScore() {
    score++;
    currentScore.innerHTML = score;
}

function matchWords() {
    if (wordInput.value == currentWord.innerHTML) {
        message.innerHTML = "Correct";
        return true;
    } else {
        message.innerHTML = "";
        return false;
    }
}
