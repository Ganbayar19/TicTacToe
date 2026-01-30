const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const turnText = document.getElementById("turn");
const restartBtn = document.getElementById("restart");

let turn = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return boardState[a];
    }
  }
  if (!boardState.includes("")) return "Draw";
  return null;
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (boardState[index] !== "") return;

  boardState[index] = turn;
  e.target.textContent = turn;

  const result = checkWin();
  if (result) {
    if (result === "Draw") {
      turnText.textContent = "Draw!";
    } else {
      turnText.textContent = `${result} Wins! 🎉`;
    }
    cells.forEach((cell) => cell.removeEventListener("click", handleClick));
    return;
  }

  turn = turn === "X" ? "O" : "X";
  turnText.textContent = `Turn: ${turn}`;
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));

restartBtn.addEventListener("click", () => {
  boardState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.textContent = ""));
  turn = "X";
  turnText.textContent = "Turn: X";
  cells.forEach((cell) => cell.addEventListener("click", handleClick));
});
