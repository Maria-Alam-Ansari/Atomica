// ─── Quiz Data ───
const quizData = [
  // --- Symbols & Atomic Numbers ---
  {
    question: "What is the chemical symbol for Helium?",
    options: ["H", "He", "Hi", "Hg"],
    answer: "He",
  },
  {
    question: "What is the atomic number of Nitrogen?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    question: "What is the chemical symbol for Silver?",
    options: ["Si", "Sv", "Ag", "Au"],
    answer: "Ag",
  },
  {
    question: "What is the atomic number of Calcium?",
    options: ["18", "19", "20", "21"],
    answer: "20",
  },
  {
    question: "What is the chemical symbol for Tin?",
    options: ["Ti", "Tn", "Sn", "Si"],
    answer: "Sn",
  },
  {
    question: "What is the atomic number of Uranium?",
    options: ["89", "90", "91", "92"],
    answer: "92",
  },
  {
    question: "What is the chemical symbol for Lead?",
    options: ["Pd", "Pb", "Pt", "Ld"],
    answer: "Pb",
  },
  {
    question: "What is the atomic number of Magnesium?",
    options: ["10", "11", "12", "13"],
    answer: "12",
  },
  {
    question: "What is the chemical symbol for Tungsten?",
    options: ["Tu", "Tn", "W", "Tg"],
    answer: "W",
  },
  {
    question: "What is the atomic number of Chlorine?",
    options: ["15", "16", "17", "18"],
    answer: "17",
  },
  {
    question: "What is the chemical symbol for Mercury?",
    options: ["My", "Mc", "Hg", "Hr"],
    answer: "Hg",
  },
  {
    question: "What is the atomic number of Aluminum?",
    options: ["11", "12", "13", "14"],
    answer: "13",
  },
  {
    question: "What is the chemical symbol for Antimony?",
    options: ["An", "Sb", "At", "Am"],
    answer: "Sb",
  },
  {
    question: "What is the atomic number of Nickel?",
    options: ["26", "27", "28", "29"],
    answer: "28",
  },
  {
    question: "What is the chemical symbol for Arsenic?",
    options: ["Ar", "As", "An", "Ac"],
    answer: "As",
  },

  // --- Groups & Families ---
  {
    question: "Which group is known as the Alkali Metals?",
    options: ["Group 1", "Group 2", "Group 17", "Group 18"],
    answer: "Group 1",
  },
  {
    question: "Which element is an alkaline earth metal?",
    options: ["Sodium", "Magnesium", "Aluminum", "Potassium"],
    answer: "Magnesium",
  },
  {
    question: "Which group is known as the Halogens?",
    options: ["Group 1", "Group 2", "Group 17", "Group 18"],
    answer: "Group 17",
  },
  {
    question: "Which element is a noble gas?",
    options: ["Nitrogen", "Oxygen", "Argon", "Chlorine"],
    answer: "Argon",
  },
  {
    question: "Which of these is a transition metal?",
    options: ["Calcium", "Iron", "Aluminum", "Silicon"],
    answer: "Iron",
  },
  {
    question: "Which element is a lanthanide?",
    options: ["Uranium", "Cerium", "Actinium", "Thorium"],
    answer: "Cerium",
  },
  {
    question:
      "Which group contains elements that are highly reactive non-metals?",
    options: ["Group 1", "Group 2", "Group 17", "Group 18"],
    answer: "Group 17",
  },
  {
    question: "Which of these is a metalloid?",
    options: ["Boron", "Carbon", "Oxygen", "Fluorine"],
    answer: "Boron",
  },

  // --- Physical Properties & States ---
  {
    question: "Which element is a liquid at room temperature?",
    options: ["Gallium", "Bromine", "Cesium", "Francium"],
    answer: "Bromine",
  },
  {
    question: "Which element is a gas at room temperature?",
    options: ["Iodine", "Bromine", "Fluorine", "Mercury"],
    answer: "Fluorine",
  },
  {
    question: "Which is the heaviest naturally occurring element?",
    options: ["Lead", "Uranium", "Plutonium", "Radium"],
    answer: "Uranium",
  },
  {
    question: "Which element is the best conductor of electricity?",
    options: ["Copper", "Gold", "Silver", "Aluminum"],
    answer: "Silver",
  },
  {
    question: "Which element has the highest melting point?",
    options: ["Iron", "Tungsten", "Platinum", "Carbon"],
    answer: "Tungsten",
  },

  // --- Periods & Trends ---
  {
    question: "Which period is Hydrogen in?",
    options: ["Period 1", "Period 2", "Period 3", "Period 4"],
    answer: "Period 1",
  },
  {
    question: "How many elements are in Period 4?",
    options: ["8", "18", "32", "2"],
    answer: "18",
  },
  {
    question: "Which element has the smallest atomic radius?",
    options: ["Lithium", "Carbon", "Fluorine", "Helium"],
    answer: "Helium",
  },
  {
    question: "Which element has the highest electronegativity?",
    options: ["Oxygen", "Chlorine", "Fluorine", "Nitrogen"],
    answer: "Fluorine",
  },

  // --- Miscellaneous & Fun Facts ---
  {
    question: "Which element is named after the planet Earth?",
    options: ["Earthium", "Tellurium", "Terbium", "Erbium"],
    answer: "Tellurium",
  },
  {
    question: "Which element is the main component of steel?",
    options: ["Carbon", "Iron", "Nickel", "Chromium"],
    answer: "Iron",
  },
  {
    question:
      "What is the only letter that does not appear on the periodic table?",
    options: ["J", "Q", "X", "Z"],
    answer: "J",
  },
  {
    question: "Which element is used in thermometers?",
    options: ["Alcohol", "Gallium", "Mercury", "Bromine"],
    answer: "Mercury",
  },
  {
    question: "Which element is used in pencils (as 'lead')?",
    options: ["Lead", "Graphite", "Carbon", "Tin"],
    answer: "Carbon",
  },
  {
    question: "Which element is essential for breathing?",
    options: ["Hydrogen", "Carbon", "Oxygen", "Nitrogen"],
    answer: "Oxygen",
  },
  {
    question: "Which element is the lightest metal?",
    options: ["Aluminum", "Magnesium", "Lithium", "Beryllium"],
    answer: "Lithium",
  },
  {
    question: "Which element is used in nuclear reactors as fuel?",
    options: ["Plutonium", "Uranium", "Thorium", "All of the above"],
    answer: "All of the above",
  },
];

// ─── Variables ───
let currentIndex = 0;
let score = 0;
let selectedQuestions = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

// ─── Shuffle Function ───
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// ─── Generate Quiz (ONLY 5 RANDOM QUESTIONS) ───
function generateQuiz() {
  const shuffled = shuffleArray([...quizData]);

  selectedQuestions = shuffled.slice(0, 5).map((q) => ({
    ...q,
    options: shuffleArray([...q.options]),
  }));
}

// ─── Load Question ───
function loadQuestion() {
  const currentQ = selectedQuestions[currentIndex];

  questionEl.textContent = currentQ.question;
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";

  currentQ.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");

    btn.onclick = () => selectAnswer(btn, option, currentQ.answer);

    optionsEl.appendChild(btn);
  });
}

// ─── Select Answer ───
function selectAnswer(button, selected, correct) {
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((btn) => (btn.disabled = true));

  if (selected === correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");

    buttons.forEach((btn) => {
      if (btn.textContent === correct) {
        btn.classList.add("correct");
      }
    });
  }

  nextBtn.style.display = "block";
}

// ─── Next Button ───
nextBtn.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex < selectedQuestions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// ─── Show Result ───
function showResult() {
  document.querySelector(".quiz-container").style.display = "none";

  const resultBox = document.getElementById("result");
  const scoreEl = document.getElementById("score");

  resultBox.style.display = "flex";

  scoreEl.textContent = `You scored ${score} / ${selectedQuestions.length}`;
}
// ─── Restart Quiz ───
restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;

  generateQuiz(); // NEW random questions

  resultBox.style.display = "none";
  document.querySelector(".quiz-container").style.display = "block";

  loadQuestion();
});

// ─── Start ───
generateQuiz();
loadQuestion();
