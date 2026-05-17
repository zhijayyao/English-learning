const quizData = [
  {
    word: "repository",
    answer: "仓库：存放项目代码和文件的地方。",
    options: ["仓库：存放项目代码和文件的地方。", "部署：把应用发布到线上环境。", "提示词：给 AI 的任务说明。"],
  },
  {
    word: "issue",
    answer: "议题：记录 Bug、建议或待办事项。",
    options: ["分支：独立开发线。", "议题：记录 Bug、建议或待办事项。", "工作流：一系列自动化步骤。"],
  },
  {
    word: "pull request",
    answer: "拉取请求：提交代码合并申请或进行代码审查。",
    options: ["拉取请求：提交代码合并申请或进行代码审查。", "讨论区：开放问答和交流。", "模型：从数据中学习出的系统。"],
  },
  {
    word: "prompt",
    answer: "提示词：给 AI 的问题、任务或上下文指令。",
    options: ["发布说明：版本更新记录。", "提示词：给 AI 的问题、任务或上下文指令。", "贡献者：参与项目的人。"],
  },
];

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");
const wordCards = document.querySelectorAll(".word-card");
const quizWord = document.querySelector("#quiz-word");
const quizOptions = document.querySelector("#quiz-options");
const quizFeedback = document.querySelector("#quiz-feedback");
const quizScore = document.querySelector("#quiz-score");
const nextButton = document.querySelector("#next-question");

let currentQuestion = 0;
let score = 0;
let answered = false;

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

wordCards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
  });
});

function renderQuestion() {
  const question = quizData[currentQuestion];
  answered = false;
  quizWord.textContent = question.word;
  quizFeedback.textContent = "请选择一个答案。";
  quizFeedback.className = "feedback";
  quizOptions.innerHTML = "";

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "option";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(button, option));
    quizOptions.append(button);
  });

  updateScore();
}

function checkAnswer(button, option) {
  if (answered) {
    return;
  }

  answered = true;
  const question = quizData[currentQuestion];
  const isCorrect = option === question.answer;

  if (isCorrect) {
    score += 1;
    quizFeedback.textContent = "回答正确！试着用这个词造一个英文句子吧。";
    quizFeedback.classList.add("correct");
    button.classList.add("correct");
  } else {
    quizFeedback.textContent = `再想想，正确答案是：${question.answer}`;
    quizFeedback.classList.add("wrong");
    button.classList.add("wrong");
  }

  [...quizOptions.children].forEach((child) => {
    child.disabled = true;
    if (child.textContent === question.answer) {
      child.classList.add("correct");
    }
  });

  updateScore();
}

function updateScore() {
  quizScore.textContent = `得分：${score} / ${currentQuestion + (answered ? 1 : 0)}`;
}

nextButton.addEventListener("click", () => {
  currentQuestion = (currentQuestion + 1) % quizData.length;
  renderQuestion();
});

renderQuestion();
