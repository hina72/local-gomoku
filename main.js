const SIZE = 15;
let board = Array(SIZE).fill().map(() => Array(SIZE).fill(null));
let currentPlayer = 'black';
let gameOver = false;

const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');

function createBoard() {
    boardEl.innerHTML = '';
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.onclick = () => handleMove(r, c, cell);
            boardEl.appendChild(cell);
        }
    }
}

function handleMove(r, c, cell) {
    if (board[r][c] || gameOver) return;

    board[r][c] = currentPlayer;
    const stone = document.createElement('div');
    stone.className = `stone ${currentPlayer}`;
    cell.appendChild(stone);

    if (checkWin(r, c)) {
        statusEl.innerText = `${currentPlayer.toUpperCase()} WINS!`;
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    statusEl.innerText = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s Turn`;
}

function checkWin(r, c) {
    const directions = [
        [0, 1], // Horizontal
        [1, 0], // Vertical
        [1, 1], // Diagonal \
        [1, -1] // Diagonal /
    ];

    return directions.some(([dr, dc]) => {
        let count = 1;
        // Check both directions (forward and backward)
        count += countStones(r, c, dr, dc);
        count += countStones(r, c, -dr, -dc);
        return count >= 5;
    });
}

function countStones(r, c, dr, dc) {
    let count = 0;
    let nr = r + dr;
    let nc = c + dc;
    while (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && board[nr][nc] === currentPlayer) {
        count++;
        nr += dr;
        nc += dc;
    }
    return count;
}

function resetGame() {
    board = Array(SIZE).fill().map(() => Array(SIZE).fill(null));
    currentPlayer = 'black';
    gameOver = false;
    statusEl.innerText = "Black's Turn";
    createBoard();
}

createBoard();