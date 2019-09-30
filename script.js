window.addEventListener("load", init);

// Default vars
let time = 5;
let difficulty = 6;
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
const difficultyInput = document.getElementById("difficulty");

// TODO: make api call to return random list of words, better yet, build a quick API
const words = ["chris", "archie", "sian", "winston", "hobnob", "sofa"];

// Initialize game
function init() {
    wordInput.addEventListener("input", checkInput);

    wordInput.addEventListener("focus", startInitiated);

    // Reduce time
    setInterval(countdown, 1000);
}

/**
 *  Watch for a focus on the input and providing the game isn't
 * currently being played, started a new game
 */
function startInitiated() {
    if (!gameStarted) {
        gameStart();
    }
}

/**
 * Launch a new game
 */
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

/**
 * Game default states
 */
function defaultState() {
    currentTime.innerHTML = "Starting...";
    currentScore.innerHTML = score;
    setDifficulty();
}

/**
 * Declare default end state (once a game has reached the time limit)
 */
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

/**
 * Gradually decrease the time after a successful input
 */
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

/**
 * Check the input for a correct matches
 */
function checkInput() {
    if (gameEnd) {
        message.innerHTML = "";
        gameStart = false;
    }

    if (matchWords()) {
        showWord();
        wordInput.value = "";
        incrementScore();
        setDifficulty();
    }
}

/**
 * If a user continues to beat the system, lower the time they have between
 * matching each word
 */
function setDifficulty() {
    if (score == 6) {
        difficulty--;
    } else if (score == 11) {
        difficulty--;
    } else if (score == 21) {
        difficulty--;
    } else if (score == 31) {
        difficulty--;
    }
    time = difficulty;

    difficultyInput.innerHTML = difficulty - 1;
}

/**
 * Take the current score and increment by one
 */
function incrementScore() {
    score++;
    currentScore.innerHTML = score;
}

/**
 * Check the input and the current word match
 */
function matchWords() {
    if (wordInput.value == currentWord.innerHTML) {
        message.innerHTML = "Correct";
        return true;
    } else {
        message.innerHTML = "";
        return false;
    }
}
