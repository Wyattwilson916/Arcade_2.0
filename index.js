let playerOne = document.createElement("INPUT");
playerOne.setAttribute("type", "submit");

let playerTwo = document.createElement("INPUT");
playerTwo.setAttribute("type", "submit");

console.log(playerOne)

const board = document.getElementById("board");

const gameState = {
  players: ["x", "o"],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
};

// Input user names, display names
function names(){

}

// For randomly picking the starting player
function rng() {
  const Num = Math.random();
  console.log(Num);
  if (Num > 0.5) {
    let startingPlayer = gameState.players[1];
    console.log("Starting player is", startingPlayer.toUpperCase());
  } else {
    let startingPlayer = gameState.players[0];
    console.log("Starting player is", startingPlayer.toUpperCase());
  }
}


function buildInitialState() {
  rng();
}
buildInitialState();

function renderState() {}

function onBoardClick() {
  renderState();
}
//for loop to switch players, loop thru players
//if player x place x in box, etc.

//check for winner
