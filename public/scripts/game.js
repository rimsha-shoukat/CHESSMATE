const chess = new Chess();
const boardElement = document.getElementById('chessboard');
let playerRole = "w";

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
                pieceElement.draggable = playerpiecesRole == square.color;
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