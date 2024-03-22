let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';
let gameEnded = false;

function printBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let cell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
            cell.textContent = board[i][j];
        }
    }
}

function checkWinner(player) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
            showWinningLine(i, 0, i, 2); // Horizontal
            return true;
        }
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
            showWinningLine(0, i, 2, i); // Vertical
            return true;
        }
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
        showWinningLine(0, 0, 2, 2); // Diagonal
        return true;
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        showWinningLine(0, 2, 2, 0); // Diagonal
        return true;
    }
    return false;
}

function isBoardFull() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

function handleMove(row, col) {
    if (!gameEnded && board[row][col] === '') {
        board[row][col] = currentPlayer;
        printBoard();
        let cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.textContent = currentPlayer;
        cell.classList.add('selected'); // Tambahkan kelas untuk animasi
        setTimeout(() => cell.classList.remove('selected'), 500); // Hapus kelas setelah animasi selesai
        if (checkWinner(currentPlayer)) {
            document.getElementById('status').textContent = `${currentPlayer} wins!`;
            gameEnded = true;
        } else if (isBoardFull()) {
            document.getElementById('status').textContent = "It's a tie!";
            gameEnded = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function resetGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    gameEnded = false;
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
    printBoard();
}

// Tambahkan fungsi untuk menampilkan garis kemenangan
function showWinningLine(startRow, startCol, endRow, endCol) {
    const boardElement = document.getElementById('board');
    const boardRect = boardElement.getBoundingClientRect();
    const cellSize = boardRect.width / 3;

    const line = document.createElement('div');
    line.classList.add('winning-line');

    if (startRow === endRow) { // Garis horizontal
        line.classList.add('horizontal-line');
        line.style.width = '100%'; // Lebarkan garis hingga penuh lebar
        line.style.height = '5px'; // Atur tinggi garis
        line.style.top = `${(startRow * cellSize) + (cellSize / 2) - 2.5}px`; // Atur posisi vertikal garis
    } else if (startCol === endCol) { // Garis vertikal
        line.classList.add('vertical-line');
        line.style.width = '5px'; // Atur lebar garis
        line.style.height = '100%'; // Tinggikan garis hingga penuh tinggi
        line.style.left = `${(startCol * cellSize) + (cellSize / 2) - 2.5}px`; // Atur posisi horizontal garis
    } else { // Garis diagonal
        line.classList.add('diagonal-line');
        line.style.width = '5px'; // Atur lebar garis diagonal
        line.style.height = `${Math.sqrt(2) * 100}%`; // Panjang diagonal sesuai dengan panjang kotak permainan
        line.style.left = `${(startCol * cellSize) + (cellSize / 2) - 2.5}px`; // Atur posisi horizontal garis diagonal
        line.style.top = `${(startRow * cellSize) + (cellSize / 2) - (Math.sqrt(2) * cellSize / 2) + 2.5}px`; // Atur posisi vertikal garis diagonal
        line.style.transformOrigin = 'top left'; // Atur titik rotasi
        line.style.transform = 'rotate(45deg)'; // Rotasi garis diagonal
    }

    document.getElementById('board').appendChild(line);
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize game
    resetGame();

    // Add click event listeners to cells
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            let row = parseInt(cell.dataset.row);
            let col = parseInt(cell.dataset.col);
            handleMove(row, col);
        });
    });

    // Add click event listener to reset button
    document.getElementById('reset').addEventListener('click', resetGame);
});
