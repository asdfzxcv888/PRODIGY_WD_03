const aiModeButton = document.getElementById('ai-mode');
const pvpModeButton = document.getElementById('pvp-mode');
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statu = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X'; // Human player starts by default
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let aimode=false

function checkForWin() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return true;
    }
  }

  return false;
}

function checkForDraw() {
  return gameState.every(cell => cell !== '');
}

aiModeButton.addEventListener('click', () => {
  resetGame();
  currentPlayer = 'X'; // Human player
  aiModeButton.disabled = true;
  pvpModeButton.disabled = true;
  aimode=true
});

pvpModeButton.addEventListener('click', () => {
  resetGame();
  currentPlayer = 'X'; // Player X starts
  aiModeButton.disabled = true;
  pvpModeButton.disabled = true;
});

function handleCellClick(cell, index) {
  if (gameState[index] !== '' || !gameActive) return;

  cell.textContent = currentPlayer;
  gameState[index] = currentPlayer;

  if (checkForWin()) {
    endGame(`${currentPlayer} wins!`);
    return;
  }

  if (checkForDraw()) {
    endGame('It\'s a draw!');
    return;
  }

  // Switch player if game is still active
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statu.textContent = `It's ${currentPlayer}'s turn`;

  // If AI player's turn and AI mode is selected, make AI move
  if (currentPlayer === 'O' && aimode) {
    setTimeout(makeAIMove, 500); // Delay AI move for better user experience
  }
}

function makeAIMove() {
  const emptyCells = gameState.reduce((acc, cell, index) => {
    if (!cell) acc.push(index);
    return acc;
  }, []);

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const index = emptyCells[randomIndex];
  const cell = cells[index];
  handleCellClick(cell, index);
}

function endGame(message) {
  statu.innerText = message;
  gameActive = false;
 
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    aiModeButton.disabled=false
    pvpModeButton.disabled=false
    aimode=false
  });
  currentPlayer = 'X'; // Reset to human player
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  statu.textContent = `It's ${currentPlayer}'s turn`;
}

// Event listeners
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(cell, index));
});

resetButton.addEventListener('click', resetGame);
