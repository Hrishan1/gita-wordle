// ======================================
// GITA WORD GAME
// PART 1
// Game Setup
// ======================================

// HTML Elements
const board = document.getElementById("board");
const message = document.getElementById("message");

const instructions = document.getElementById("instructions");
const playBtn = document.getElementById("playBtn");

const helpBtn = document.getElementById("helpBtn");
const restartBtn = document.getElementById("restartBtn");

const resultModal = document.getElementById("resultModal");
const resultTitle = document.getElementById("resultTitle");
const resultWord = document.getElementById("resultWord");
const playAgainBtn = document.getElementById("playAgainBtn");

// Game Variables
let answer;
let answerDisplay;

let wordLength = 5;

let currentRow = 0;
let currentCol = 0;

let guesses = [];

let gameOver = false;

// ======================================
// START GAME
// ======================================

startGame();

function startGame() {

    board.innerHTML = "";
    message.textContent = "";

    currentRow = 0;
    currentCol = 0;

    guesses = [];

    gameOver = false;

    // Pick random word
    const randomWord =
        WORDS[Math.floor(Math.random() * WORDS.length)];

    answer = randomWord.input.toLowerCase();
    answerDisplay = randomWord.display;

    wordLength = answer.length;

    createBoard();

    console.log("Today's Word:", answer);

}

// ======================================
// CREATE BOARD
// ======================================

function createBoard() {

    board.innerHTML = "";

    for (let r = 0; r < 6; r++) {

        const row = document.createElement("div");
        row.className = "row";

        for (let c = 0; c < wordLength; c++) {

            const tile = document.createElement("div");

            tile.className = "tile";

            tile.dataset.row = r;
            tile.dataset.col = c;

            row.appendChild(tile);

        }

        board.appendChild(row);

    }

}

// ======================================
// HELP POPUP
// ======================================

playBtn.addEventListener("click", () => {

    console.log("Play button clicked");

    instructions.style.display = "none";

});

helpBtn.addEventListener("click", () => {

    instructions.style.display = "flex";

});

// ======================================
// RESTART GAME
// ======================================

restartBtn.addEventListener("click", () => {

    instructions.style.display = "none";

    resultModal.classList.add("hidden");

    startGame();

});

// ======================================
// PLAY AGAIN
// ======================================

playAgainBtn.addEventListener("click", () => {

    resultModal.classList.add("hidden");

    startGame();

});

// ======================================
// MESSAGE FUNCTION
// ======================================

function showMessage(text) {

    message.textContent = text;

    setTimeout(() => {

        message.textContent = "";

    }, 2000);

}

// ======================================
// PLACEHOLDERS
// (Added in Part 2)
// ======================================

function addLetter(letter) {}

function removeLetter() {}

// ======================================
// GITA WORD GAME
// PART 2
// Keyboard + User Input
// ======================================


// ======================================
// PHYSICAL KEYBOARD INPUT
// ======================================

document.addEventListener("keydown", (event) => {

    if (gameOver) return;


    let key = event.key.toLowerCase();


    if (key === "enter") {

        submitGuess();

        return;

    }


    if (key === "backspace") {

        removeLetter();

        return;

    }


    if (/^[a-z]$/.test(key)) {

        addLetter(key);

    }

});


// ======================================
// ON-SCREEN KEYBOARD
// ======================================

const keys = document.querySelectorAll(".key");


keys.forEach(key => {


    key.addEventListener("click", () => {


        if (gameOver) return;


        let letter = key.textContent.toLowerCase();


        if (key.id === "enterKey") {

            submitGuess();

            return;

        }


        if (key.id === "backspaceKey") {

            removeLetter();

            return;

        }


        addLetter(letter);


    });


});


// ======================================
// ADD LETTER TO BOARD
// ======================================

function addLetter(letter) {


    if (currentCol >= wordLength) {

        return;

    }


    const tile =
        document.querySelector(
            `.tile[data-row="${currentRow}"][data-col="${currentCol}"]`
        );


    tile.textContent = letter;


    currentCol++;


}



// ======================================
// REMOVE LETTER
// ======================================

function removeLetter() {


    if (currentCol === 0) {

        return;

    }


    currentCol--;


    const tile =
        document.querySelector(
            `.tile[data-row="${currentRow}"][data-col="${currentCol}"]`
        );


    tile.textContent = "";


}


// ======================================
// CHECK DATABASE
// ======================================

function wordExists(word) {


    return WORDS.some(item => {


        return item.input === word;


    });


}


// ======================================
// SUBMIT GUESS
// ======================================

function submitGuess() {


    if (gameOver) return;


    if (currentCol !== wordLength) {


        showMessage("Not enough letters");


        return;

    }


    let guess = "";


    for (let i = 0; i < wordLength; i++) {


        const tile =
            document.querySelector(
                `.tile[data-row="${currentRow}"][data-col="${i}"]`
            );


        guess += tile.textContent;


    }



    // Check if word is in database

    if (!wordExists(guess)) {


        showMessage("Word is not in the database");


        return;

    }



    guesses.push(guess);



    // Part 3 will handle:
    // - colors
    // - animations
    // - win/lose


    currentRow++;

    currentCol = 0;


}
// ======================================
// GITA WORD GAME
// PART 3
// Wordle Logic + Results
// ======================================


// ======================================
// CHECK GUESS
// ======================================

function checkGuess(guess) {


    let answerArray = answer.split("");

    let guessArray = guess.split("");

    let results = Array(wordLength).fill("gray");



    // First check correct positions

    for (let i = 0; i < wordLength; i++) {


        if (guessArray[i] === answerArray[i]) {


            results[i] = "green";


            answerArray[i] = null;


            guessArray[i] = null;


        }

    }



    // Then check incorrect positions

    for (let i = 0; i < wordLength; i++) {


        if (guessArray[i] !== null) {


            let index =
                answerArray.indexOf(guessArray[i]);



            if (index !== -1) {


                results[i] = "yellow";


                answerArray[index] = null;


            }


        }


    }



    return results;

}


// ======================================
// COLOR KEYBOARD
// ======================================

function updateKeyboard(letter, color) {


    const buttons =
        document.querySelectorAll(".key");


    buttons.forEach(button => {


        if (button.textContent.toLowerCase() === letter) {


            button.classList.remove(
                "green",
                "yellow",
                "gray"
            );


            button.classList.add(color);


        }


    });


}


// ======================================
// FINISH GUESS
// ======================================

function finishGuess(guess) {


    let colors = checkGuess(guess);



    for (let i = 0; i < wordLength; i++) {


        const tile =
            document.querySelector(
                `.tile[data-row="${currentRow}"][data-col="${i}"]`
            );


        setTimeout(() => {


            tile.classList.add("flip");


            tile.classList.add(colors[i]);


            updateKeyboard(
                guess[i],
                colors[i]
            );


        }, i * 250);



    }



    // Check win

    if (guess === answer) {


        setTimeout(() => {


            endGame(true);


        }, wordLength * 300);



        return;

    }



    currentRow++;

    currentCol = 0;



    // Check lose

    if (currentRow === 6) {


        setTimeout(() => {


            endGame(false);


        }, 1000);


    }


}



// ======================================
// REPLACE SUBMIT FUNCTION
// ======================================

submitGuess = function() {


    if (gameOver) return;



    if (currentCol !== wordLength) {


        showMessage("Not enough letters");


        return;

    }



    let guess = "";



    for (let i = 0; i < wordLength; i++) {


        const tile =
            document.querySelector(
                `.tile[data-row="${currentRow}"][data-col="${i}"]`
            );


        guess += tile.textContent;


    }



    if (!wordExists(guess)) {


        showMessage(
            "Word is not in the database"
        );


        return;

    }



    finishGuess(guess);


};



// ======================================
// END GAME
// ======================================

function endGame(win) {


    gameOver = true;



    if (win) {


        resultTitle.textContent =
            "Congratulations! 🎉";


        resultWord.textContent =
            "You guessed the word!";


    }

    else {


        resultTitle.textContent =
            "Game Over";


        resultWord.textContent =
            "The word was: " + answerDisplay;


    }



    resultModal.classList.remove(
        "hidden"
    );


}
