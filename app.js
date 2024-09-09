// Define questions
const questions = [
    {
        question: "What is the correct syntax to declare a variable?",
        option1: "var variable",
        option2: "let variable",
        option3: "const variable",
        option4: "All of the above",
        ans: "All of the above"
    },
    {
        question: "Which of the following is used to create an object in JavaScript?",
        option1: "{}",
        option2: "[]",
        option3: "()",
        option4: "<>",
        ans: "{}"
    },
    {
        question: "Which method is used to parse a string to an integer in JavaScript?",
        option1: "parseInt()",
        option2: "parseinteger()",
        option3: "parsestring",
        option4: "none",
        ans: "parseInt()"
    }
];

let index = 0;
let result = 0;
const totalQuestions = questions.length;
let timerInterval;

// Page navigation functions
function showElement(id) {
    document.getElementById(id).classList.remove('hidden');
}

function hideElement(id) {
    document.getElementById(id).classList.add('hidden');
}

// Show the quiz rules page
document.getElementById('startQuizBtn').addEventListener('click', function() {
    hideElement('interfacePage');
    showElement('quizRules');
});

// Show the quiz page
document.getElementById('continueQuizBtn').addEventListener('click', function() {
    hideElement('quizRules');
    showElement('quizPage');
    startTimer();
    renderQues();
});

// Exit the quiz
document.getElementById('exitQuizBtn').addEventListener('click', function() {
    hideElement('quizRules');
    showElement('interfacePage');
});

// Restart the quiz
document.getElementById('restartQuizBtn').addEventListener('click', function() {
    hideElement('resultPage');
    showElement('interfacePage');
});

// Exit from results
document.getElementById('exitResultBtn').addEventListener('click', function() {
    hideElement('resultPage');
    showElement('interfacePage');
});

// Render questions
function renderQues() {
    const container = document.getElementById('container');
    const options = document.getElementsByName('options');

    if (index > 0) {
        let optionSelected = false;
        for (let i = 0; i < options.length; i++) {
            if (options[i].checked) {
                optionSelected = true;
                if (questions[index - 1].ans === options[i].value) {
                    result++;
                }
                break;
            }
        }

        if (!optionSelected) {
            alert('Please select an option before proceeding.');
            return;
        }
    }

    if (index >= totalQuestions) {
        // Show the result page
        const resultMessage = document.getElementById('resultMessage');
        if (result === totalQuestions) {
            resultMessage.textContent = 'Congratulations! You answered all questions correctly.';
        } else {
            resultMessage.textContent = 'You answered ' + result + ' out of ' + totalQuestions + ' questions correctly.';
        }
        hideElement('quizPage');
        showElement('resultPage');
        index = 0;
        result = 0;
        clearInterval(timerInterval);
        return;
    }

    const currentQuestion = questions[index];
    container.innerHTML = `
        <p class="question">${currentQuestion.question}</p>
        <div><input type="radio" name="options" value="${currentQuestion.option1}"> ${currentQuestion.option1}</div>
        <div><input type="radio" name="options" value="${currentQuestion.option2}"> ${currentQuestion.option2}</div>
        <div><input type="radio" name="options" value="${currentQuestion.option3}"> ${currentQuestion.option3}</div>
        <div><input type="radio" name="options" value="${currentQuestion.option4}"> ${currentQuestion.option4}</div>
    `;
    index++;
}

// Timer function
function startTimer() {
    let timerDuration = 300; // 5 minutes in seconds
    const timerValue = document.getElementById('timerValue');

    function updateTimer() {
        const minutes = Math.floor(timerDuration / 60);
        const seconds = timerDuration % 60;
        timerValue.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timerDuration <= 0) {
            clearInterval(timerInterval);
            timerValue.textContent = '00:00';
            alert('Time is up!');
            renderQues();
        } else {
            timerDuration--;
        }
    }

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

// Event listener for Next button
document.getElementById('nextQuestionBtn').addEventListener('click', function() {
    renderQues();
});
