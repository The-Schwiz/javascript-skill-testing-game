const timerEl = document.getElementById("timer");
const contentEl = document.getElementById("content");
let currentQuestionIndex;
const headerEl = document.querySelector("#header")
let resultText = "";

const questions = [
    {
        title: 'What is the first index of an array equal to?',
        options: [
            '1',
            '0',
            '4',
            '3',
        ],
        answer: 1
    },
    {
        title: 'Which of the following is not a primitive data type?',
        options: [
            'Boolean',
            'String',
            'Number',
            'Argument',
        ],
        answer: 3
    },
    {
        title: 'Arrays in JavaScript are defined by which of the following statements?',
        options: [
            'It is an ordered list of values',
            'It is an ordered list of objects',
            'It is an ordered list of strings',
            'It is an ordered list of functions',
        ],
        answer: 0
    },
    {
        title: 'Which of the following can be used to call a JavaScript Code Snippet?',
        options: [
            'Function/Method',
            'Preprocessor',
            'Triggering Event',
            'RMI',
        ],
        answer: 0
    },
    {
        title: 'Which of the following is the property that is triggered in response to JS errors?',
        options: [
            'onclick',
            'onerror',
            'onmessage',
            'onexception',
        ],
        answer: 1
    },
];

let scores = [];

let secondsLeft = questions.length * 10;

timerEl.textContent = secondsLeft;

// countdown interval setup
let intervalID;

function countdown() {
    timerEl.textContent = secondsLeft;
    if (secondsLeft == 0) {
        showFinalScreen();
    }
    secondsLeft--;
}

function startTimer() {
    // this function gets called again when restarting the game
    // re-intialize the variables
    currentQuestionIndex = 0;
    secondsLeft = questions.length * 10; // 10 seconds per question
    intervalID = setInterval(countdown, 1000);
    showQuestion();
}

// Injects ths start quiz screen on load
function showStartScreen() {
    contentEl.innerHTML = `
        <div id="start-screen">
            <button id="start" onclick="startTimer()" value="start">Start Quiz</button>
        </div>
    `
}

// display questions and indexes user response
function showQuestion() {

    const currentQuestion = questions[currentQuestionIndex];
    headerEl.children[0].textContent = "Let's Go!"

    contentEl.innerHTML = ` 
        <!-- Question Title -->
        <h1>${currentQuestion.title}</h1>
        <!-- Options -->

        <div id="answers">
        <button id="answer-btn" class="" onClick="goToNextQuestion(0)">${currentQuestion.options[0]}</button>
        <button id="answer-btn" onClick="goToNextQuestion(1)">${currentQuestion.options[1]}</button>
        <button id="answer-btn" onClick="goToNextQuestion(2)">${currentQuestion.options[2]}</button> 
        <button id="answer-btn" onClick="goToNextQuestion(3)">${currentQuestion.options[3]}</button>
        </div>

        <!-- Result of previous question -->
        <h3 id="result">${resultText}</h3>
    `;
}

// goes to next question on click and determines if correct or wrong. If wrong subtracts time from score
function goToNextQuestion(optionIndex) {
    const answerIndex = questions[currentQuestionIndex].answer;
    if (optionIndex === answerIndex) {
        resultText = "Correct!";
    } else {
        resultText = "Wrong :(";
        secondsLeft -= 10;
        if (secondsLeft < 0) { // edge case, secondsLeft is negative
            secondsLeft = 0;
        }

    }

    // Shows next question if quiz is not finished. If finished shows final screen
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showFinalScreen();
    }
}

// Injects content of final screen
function showFinalScreen() {
    timerEl.textContent = secondsLeft;
    contentEl.innerHTML = `
        <h1>All Done!</h1>
        <h2>Your final score is ${secondsLeft}</h2>
        Enter your initials: <input id="initials" type="text"/>
        <button id="submit-btn" onclick="addNewScore()">Submit</button>
        <h3 id="result">${resultText}</h3>
    `;
    clearInterval(intervalID);
}

// adds initials from inputs + seconds left as a new score to scores array
function addNewScore() {
    const userInitials = document.getElementById("initials").value
    const newScore = {
        initials: userInitials,
        score: secondsLeft,
    }
    scores.push(newScore);
    // go to scores screen
    viewHighScores();
}

// Navigates to high scores screen and injects retry and clear scores buttons
function viewHighScores() {
    contentEl.innerHTML = `
        <h1>High Scores:</h1> 
    `
    for (const userScore of scores) {
        contentEl.innerHTML += `<div id="user-score">${userScore.initials}: ${userScore.score}</div>`
    }

    contentEl.innerHTML += `
    <div id="final-screen-btns">
    <button id="retry-btn" onclick="showStartScreen()">
        Retry!
    </button>
    <button id= "clear-score-btn" onclick="clearScores(); showStartScreen()">
        Clear Scores
    </button>
    </div>
    `
}

// clears scores array if clicked
function clearScores() {
    scores = [];
}


// initially display the first question
showStartScreen();

