let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

choices.forEach((select) => {
  select.addEventListener("click", () => {
    const userChoice = select.getAttribute("id");
    playGame(userChoice);
  });
});

const playGame = (userChoice) => {

  // Generate computer choice
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    // Draw Game
    drawGame(userChoice);
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      // Scissor , paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      // Scissor , rock
      userWin = compChoice === "scissor" ? false : true;
    } else {
      // rock , paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

const genCompChoice = () => {
  const options = ["rock", "paper", "scissor"];
  const randomindex = Math.floor(Math.random() * 3);
  // Math.random -> gives values between 0 and 1
  // Math.random * 3 -> values in between 0 and 3
  // Math.floor -> Removes the values after 1 decimal place
  // We did this to get the number for array index

  return options[randomindex];
};

const drawGame = (userChoice) => {
  msg.innerText = `Game Draw ! Both choose ${userChoice}`;
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You Won ! your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You Loose ! ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const selResult = document.querySelector(".result");
const selNewGame = document.querySelector(".newGame");

selResult.addEventListener("click", () => {
  giveResult(userScore, compScore);
  userScore = 0;
  compScore = 0;
});

selNewGame.addEventListener("click", () => {
  newGame(userScore, compScore);
  userScore = 0;
  compScore = 0;
});

const giveResult = (userScore, compScore) => {
  if (userScore > compScore) {
    msg.innerText = `You Won by ${userScore - compScore} points`;
    msg.style.backgroundColor = "green";
  } else if (userScore < compScore) {
    msg.innerText = `You Loose by ${compScore - userScore} points`;
    msg.style.backgroundColor = "red";
  } else {
    msg.innerText = `Game Draw ! Both got ${userScore} points`;
    msg.style.backgroundColor = "#081b31";
  }
  disableChoices();
};

const newGame = (userScore, compScore) => {
  msg.innerText = "Pick your move";
  msg.style.backgroundColor = "#081b31";
  compScorePara.innerText = 0;
  userScorePara.innerText = 0;
  enableChoices();
};

const disableChoices = () => {
  for(let selectChoice of choices){
    selectChoice.disabled = true;
  }
  selResult.disabled = true;
};

const enableChoices = () => {
  choices.forEach((selectChoice) => {
    selectChoice.disabled = false;
  });
  selResult.disabled = false;
};
