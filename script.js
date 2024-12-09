const questions = [
    {
        question: "How many days are there in a week?",
        answers: [
            { text: "2", correct: false },
            { text: "1", correct: false },
            { text: "7", correct: true },
            { text: "3", correct: false }
        ]
    },
    {
        question: "How many minutes are there in an hour?",
        answers: [
            { text: "60", correct: true },
            { text: "30", correct: false },
            { text: "20", correct: false },
            { text: "40", correct: false }
        ]
    },
    {
        question: "How many letters are there in the English alphabet?",
        answers: [
            { text: "26", correct: true },
            { text: "30", correct: false },
            { text: "12", correct: false },
            { text: "40", correct: false }
        ]
    },
    {
        question: "Which animal is known as the 'Ship of the Desert?'",
        answers: [
            { text: "Cat", correct: false },
            { text: "Elephant", correct: false },
            { text: "Camel", correct: true },
            { text: "Fox", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementsByClassName("answer-btn")[0];
const nextButton = document.getElementsByClassName("next-btn")[0];
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";  // Initially hide the next button
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";  // Hide next button until answer is selected
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);  // Remove all previous answer buttons
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    // Disable all buttons after an answer is selected
    Array.from(answerButton.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });
    nextButton.style.display = "block";  // Show next button after answering
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();  // Restart quiz after completion
    }
});

startQuiz();  // Start the quiz when the page loads
