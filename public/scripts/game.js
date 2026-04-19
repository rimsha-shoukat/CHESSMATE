const chess = new Chess();
const boardElement = document.getElementById('chessboard');
let playerRole = "w";
let profile1 = document.querySelector(".profile1");
let profile2 = document.querySelector(".profile2");
let you = document.querySelector(".you");
let player = document.querySelector(".player");

if (playerRole == "w") {
    profile2.classList.remove("turn");
    profile1.classList.add("turn");
} else {
    profile1.classList.remove("turn");
    profile2.classList.add("turn");
}

function renderBoard() {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowIndex) => {
        row.forEach((square, squareIndex) => {
            const squareElement = document.createElement('div');
            squareElement.classList.add('square', (rowIndex + squareIndex) % 2 === 0 ? "light" : "dark");

            squareElement.dataset.row = rowIndex;
            squareElement.dataset.col = squareIndex;

            if (square) {
                const pieceElement = document.createElement('span');
                pieceElement.classList.add("piece", square.color == 'w' ? "white" : "black");
                pieceElement.innerText = getPieceUnicode(square);
                pieceElement.draggable = playerRole == square.color;
                squareElement.appendChild(pieceElement);
            }
            boardElement.appendChild(squareElement);
        })
    })
}

renderBoard();


function getPieceUnicode(square) {
    const pieceSymbols = {
        'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟'
    };

    return pieceSymbols[square.type] || "";
}