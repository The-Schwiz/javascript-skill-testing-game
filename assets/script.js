const timerEl = document.getElementById("timer");
const contentEl = document.getElementById("content");
let currentQuestionIndex;
// const startEl = document.getElementById("start-screen")
const headerEl = document.querySelector("#header")
// let initials = document.getElementById("initials").value; 
let resultText = "";

// let highScores = [
//     { 
//         userName: initials, 
//         score: secondsLeft, 
//     }
// ]

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
    if(secondsLeft == 0) {
        showFinalScreen();
    }
    secondsLeft --;
}

function startTimer(){
    // this function gets called again when restarting the game
    // re-intialize the variables
    currentQuestionIndex = 0;
    secondsLeft = questions.length * 10; // 10 seconds per question
    intervalID = setInterval(countdown, 1000);
    showQuestion();
}


function showStartScreen() {
    contentEl.innerHTML = `
        <div id="start-screen">
            <button id="start" onclick="startTimer()" value="start">Start Quiz</button>
        </div>
    `
}


// display content
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

        <!-- Result -->
        <h3 id="result">${resultText}</h3>
    `;
}

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

    currentQuestionIndex ++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else { // reached the end
        showFinalScreen();
    }
}

function showFinalScreen(){
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

function addNewScore(){
    // adds initials from inputs + seconds left as a new score
    const userInitials = document.getElementById("initials").value
    const newScore = {
        initials: userInitials, 
        score: secondsLeft,
    }
    scores.push(newScore);
    // go to scores screen
    viewHighScores();
}


function viewHighScores(){
    contentEl.innerHTML = `
        <h1>High Scores:</h1> 
    `
    for (const userScore of scores) {
        console.log(userScore.score);
        console.log(userScore.initials);
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

function clearScores(){
    scores = [];
}


// initially display the first question
// showQuestion();
showStartScreen();

  


// startEl.setAttribute
