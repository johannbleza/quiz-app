const start = document.querySelector(".start");
const quiz = document.querySelector(".quiz");
const question = document.querySelector(".question");
const choices = document.querySelector(".choices");
const choises = document.querySelector(".choices");
const nextBtn = document.querySelector(".next-btn");
const scoreElement = document.querySelector(".score");
const playAgain = document.querySelector(".playAgain");
const end = document.querySelector(".end");

// Question DATA
const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    choices: [
      {
        answer: "Earth",
        isCorrect: false,
      },
      {
        answer: "Mars",
        isCorrect: true,
      },
      {
        answer: "Jupiter",
        isCorrect: false,
      },
      {
        answer: "Saturn",
        isCorrect: false,
      },
    ],
  },
  {
    question: "What is the boiling point of water?",
    choices: [
      {
        answer: "90°C",
        isCorrect: false,
      },
      {
        answer: "110°C",
        isCorrect: false,
      },
      {
        answer: "100°C",
        isCorrect: true,
      },
      {
        answer: "120°C",
        isCorrect: false,
      },
    ],
  },
  {
    question: "What is the capital of France?",
    choices: [
      {
        answer: "Berlin",
        isCorrect: false,
      },
      {
        answer: "Madrid",
        isCorrect: false,
      },
      {
        answer: "Paris",
        isCorrect: true,
      },
      {
        answer: "Rome",
        isCorrect: false,
      },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    choices: [
      {
        answer: "Atlantic Ocean",
        isCorrect: false,
      },
      {
        answer: "Indian Ocean",
        isCorrect: false,
      },
      {
        answer: "Arctic Ocean",
        isCorrect: false,
      },
      {
        answer: "Pacific Ocean",
        isCorrect: true,
      },
    ],
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    choices: [
      {
        answer: "Charles Dickens",
        isCorrect: false,
      },
      {
        answer: "William Shakespeare",
        isCorrect: true,
      },
      {
        answer: "Mark Twain",
        isCorrect: false,
      },
      {
        answer: "Jane Austen",
        isCorrect: false,
      },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;

start.addEventListener("click", startGame);

function startGame() {
  resetState();
  quiz.style.display = "flex";
  end.style.display = "none";
  start.style.display = "none";

  score = 0;
  currentQuestionIndex = 0;
  showQuestion(currentQuestionIndex);
  currentQuestionIndex++;
}

function showQuestion(index) {
  const currentQuestion = questions[index];
  question.innerHTML = `${index + 1}. ${currentQuestion.question.replace(
    "?",
    "❓"
  )}`;

  currentQuestion.choices.forEach((choice) => {
    const answer = document.createElement("button");
    answer.innerHTML = choice.answer;
    // Adds class style and adds the value of isCorrect
    answer.classList.add("answer-btn", "hover", choice.isCorrect);
    choices.appendChild(answer);
    // Click event
    answer.addEventListener("click", () => {
      document.querySelectorAll(".answer-btn").forEach((btn) => {
        // Disable all buttons and hover effect
        btn.disabled = true;
        btn.classList.remove("hover");
      });
      // Correct answer will show green otherwise red
      if (choice.isCorrect) {
        answer.classList.add("correct");
        answer.disabled = false;
        score++;
      } else {
        answer.classList.add("wrong");
        answer.disabled = false;
        // Highlights the correct answer
        document.querySelectorAll(".answer-btn").forEach((btn) => {
          if (btn.classList.contains(true)) {
            btn.classList.add("correct");
            btn.disabled = false;
          }
        });
      }
      nextBtn.style.display = "block";
    });
  });
}

nextBtn.addEventListener("click", nextQuestion);

function resetState() {
  choices.innerHTML = "";
  nextBtn.style.display = "none";
}

function nextQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endGame();
  } else {
    resetState();
    showQuestion(currentQuestionIndex++);
  }
}

function endGame() {
  quiz.style.display = "none";
  end.style.display = "flex";
  scoreElement.innerHTML = `Your score is: ${score}/${questions.length}✅`;
}

playAgain.addEventListener("click", startGame);
