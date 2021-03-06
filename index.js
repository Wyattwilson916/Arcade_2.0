const board = document.getElementById("board");
let nameOneOutput = document.getElementById("nameOneOutput");
let nameTwoOutput = document.getElementById("nameTwoOutput");
const submitNames = document.getElementById("submitNames");
let currentOutput = document.getElementById("currentOutput");
let playerOne = document.getElementById("playerOne");
let playerTwo = document.getElementById("playerTwo");
let statusDisplay = document.getElementById("statusDisplay");
let reset = document.getElementById("reset");
const form = document.getElementById("my_form");
const form2 = document.getElementById("my_form2");
const singlePlayBtn = document.getElementById("1PlayBtn");
const twoPlayBtn = document.getElementById("2PlayBtn");

form.style.display = "none";
form2.style.display = "none";
submitNames.style.display = "none";

singlePlayBtn.addEventListener("click", () => {
  submitNames.style.display = "block";
  if (form2.style.display === "block") {
    form2.style.display = "none";
    form.style.display = "block";
  } else {
    if (form.style.display === "block") {
      form.style.display = "none";
    } else {
      form.style.display = "block";
    }
  }
});

twoPlayBtn.addEventListener("click", () => {
  submitNames.style.display = "block";
  if (form.style.display === "block") {
    form.style.display = "none";
    form2.style.display = "block";
  } else {
    if (form2.style.display === "block") {
      form2.style.display = "none";
    } else {
      form2.style.display = "block";
    }
  }
});

function displayNames() {
  submitNames.addEventListener("click", displayNames);
  if(playerOne.value && playerTwo.value){
    nameOneOutput.innerHTML = playerOne.value;
    nameTwoOutput.innerHTML = playerTwo.value;
  } else if(!nameTwoOutput.innerHTML){
    nameOneOutput.innerHTML = playerOne.value;
    nameTwoOutput.innerHTML = "Computer";
  }
  

  submitNames.addEventListener("click", function handleSubmit(event) {
    event.preventDefault();
    form.reset();
    form2.reset();
  });

  function rng() {
    const Num = Math.random();
    if (Num > 0.5) {
      currentOutput.innerHTML = playerOne.value;
    } else {
      currentOutput.innerHTML = playerTwo.value;
    }
  }
  if (playerOne.value && playerTwo.value) {
    rng();
  }
}

let gameState = {
  winner: null,
  players: ["X", "O"],
  currentPlayer: "X",
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  winningConditions: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
};

function gameBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = `${i}-${j}`;
      board.appendChild(cell);
    }
  }
}

function buildInitialState() {
  displayNames();
  gameBoard();
}

buildInitialState();

function playerChange() {
  if (gameState.currentPlayer === gameState.players[0]) {
    gameState.currentPlayer = gameState.players[1];
    currentOutput.innerHTML = playerTwo.value;
    console.log(`It's ${gameState.currentPlayer}'s turn`);
  } else if (gameState.currentPlayer === gameState.players[1]) {
    gameState.currentPlayer = gameState.players[0];
    currentOutput.innerHTML = playerOne.value;
    console.log(`It's ${gameState.currentPlayer}'s turn`);
  }
}

function gameMove(id, event) {
  const row = id[0];
  const column = id[2];
  if (gameState.board[row][column] === null) {
    gameState.board[row][column] = gameState.currentPlayer;
    event.target.innerText = gameState.board[row][column];
    playerChange();
  }
}

// const winningMessage = () => `Player ${currentPlayer} has won!`;

function winningCondition() {
  let flatGameBoard = gameState.board.flat();
  for (let i = 0; i < gameState.winningConditions.length; i++) {
    let win1 = gameState.winningConditions[i][0];
    let win2 = gameState.winningConditions[i][1];
    let win3 = gameState.winningConditions[i][2];
    let cellA = flatGameBoard[win1];
    let cellB = flatGameBoard[win2];
    let cellC = flatGameBoard[win3];
    if (cellA !== null && cellA === cellB && cellB === cellC) {
      return true;
    }
    return false;
  }
}

function handleClick(event) {
  const id = event.target.id;
  if (!winningCondition()) {
    gameMove(id, event);
  }
}

board.addEventListener("click", handleClick);

function renderBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.getElementById(`${i}-${j}`);
      cell.innerText = gameState.board[i][j];
    }
  }
}

reset.addEventListener("click", () => {
  gameState = {
    winner: null,
    players: ["X", "O"],
    currentPlayer: "X",
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    winningConditions: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
  };
  renderBoard();
  function restartGame() {
    nameOneOutput.innerHTML = "";
    nameTwoOutput.innerHTML = "";
    winner = "";
    currentOutput = ""
  }

  restartGame();
});

// enter our names and have them displayed *
// have our order chosen for us by the game *
// take turns placing our marks in empty spaces *
// not be able to place our marks in an occupied space *
// be told when a move causes a player to win, or to draw
// start the game over without having to reset the browser*

// As a user playing a one player game I want to:

// see the name 'Computer' displayed as my opponent*
// have the Computer player make moves as if it were a human player with the correct mark in an empty space

// As a user playing a single player game I would be delighted to:

// have the Computer make 'better-than-guessing' choices when placing a mark on the board
// set the board size myself ("wider" or "taller" than 3x3)
