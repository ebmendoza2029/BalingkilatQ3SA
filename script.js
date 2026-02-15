const grid = document.getElementById("grid");
const movesText = document.getElementById("moves");
const restartBtn = document.getElementById("restart");

const maxMoves = 20;

const symbols = ["🍎","🍌","🍇","🍉","🍒","🍍","🥝","🍓"];
let cards = [...symbols, ...symbols];

let flipped = [];
let moves = 0;
let matchedPairs = 0;
const totalPairs = symbols.length;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  grid.innerHTML = "";
  shuffle(cards);

  moves = 0;
  matchedPairs = 0;
  flipped = [];

  movesText.textContent = "Moves: 0";

  cards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;

    card.addEventListener("click", () => flipCard(card));
    grid.appendChild(card);
  });
}

function flipCard(card) {
  if (flipped.length === 2) return;
  if (card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  card.textContent = card.dataset.symbol;
  flipped.push(card);

  if (flipped.length === 2) {
    moves++;
    movesText.textContent = "Moves: " + moves;
    checkMatch();
  }
}

function checkMatch() {
  const [a, b] = flipped;

  if (a.dataset.symbol === b.dataset.symbol) {
    matchedPairs++;
    flipped = [];

    if (matchedPairs === totalPairs) {
      if (moves <= maxMoves) {
        showWin();
      } else {
        showLose();
      }
    }
  } else {
    setTimeout(() => {
      a.classList.remove("flipped");
      b.classList.remove("flipped");
      a.textContent = "";
      b.textContent = "";
      flipped = [];
    }, 800);
  }
}

function showWin() {
  alert("You win in " + moves + " moves!");
}

function showLose() {
  alert("You finished in " + moves + " moves. Over 20 moves = loss.");
}

restartBtn.addEventListener("click", createBoard);

createBoard();