const chess = new Chess();
const boardElement = document.getElementById('chessboard');
let playerRole = "w";
let profile1 = document.querySelector(".profile1");
let profile2 = document.querySelector(".profile2");
let you = document.querySelector(".you");
let player = document.querySelector(".player");

let dragPiece = null;
let sourceSquare = null;

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
                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        dragPiece = pieceElement;
                        sourceSquare = { row: rowIndex, col: squareIndex };
                        e.dataTransfer.setData("text/plain", " ");
                    }
                });
            }

            squareElement.addEventListener("dragover", (e) => { e.preventDefault(); });
            squareElement.addEventListener("drop", (e) => {
                e.preventDefault();
                if (dragPiece) {
                    const targetSquare = { row: parseInt(squareElement.dataset.row), col: parseInt(squareElement.dataset.col) };
                    handleMove(sourceSquare, targetSquare);
                }
            });

            boardElement.appendChild(squareElement);
        })
    });
}

renderBoard();

function handleMove(sourceSquare, targetSquare) {
    console.log("moved");
}

function getPieceUnicode(square) {
    const pieceSymbols = {
        'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟'
    };

    return pieceSymbols[square.type] || "";
}