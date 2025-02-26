const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'x';
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Represents the board

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a]; // Return the winner (x or o)
        }
    }
    return null; // No winner yet
}

function checkTie() {
    return gameBoard.every(cell => cell !== ''); // Check if all cells are filled
}

function handleClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameBoard[index] === '') {  // Only allow move if cell is empty
        gameBoard[index] = currentPlayer;
        cell.classList.add(currentPlayer); // Add x or o class for styling
        cell.textContent = currentPlayer; // Display X or O

        const winner = checkWinner();
        if (winner) {
            message.textContent = `Congratulations, winner is: ${winner.toUpperCase()}`;
            disableCells(); // Prevent further moves
        } else if (checkTie()) {
            message.textContent = "Tied, Please try again";
        } else {
            currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
            message.textContent = `${currentPlayer.toUpperCase()}'s turn`;
        }
    }
}

function disableCells() {
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function enableCells() {
    cells.forEach(cell => cell.addEventListener('click', handleClick));
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'x';
    message.textContent = "X's turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o'); // Remove x and o classes
    });
    enableCells();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
message.textContent = "X's turn"; // Initial message

resetButton.addEventListener('click', resetGame); // Reset button functionality
