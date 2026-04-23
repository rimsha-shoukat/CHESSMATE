const socket = io();
let myColor = null;

socket.emit("joinGame");

socket.on("waiting", () => {
    alert("Waiting for opponent...");
});

socket.on("playerRole", (color) => {
    myColor = color;
    playerRole = color;
    updateUI();
    renderBoard();
});

socket.on("move", (move) => {
    chess.move(move);
    updateUI();
    renderBoard();
    checkGameOver();
});

socket.on("opponentLeft", () => {
    alert("Opponent disconnected!");
});

function handleDrop(e) {
    e.preventDefault();
    if (!dragPiece) return;
    if (chess.turn() !== myColor) return;

    const targetSquare = { row: parseInt(e.currentTarget.dataset.row), col: parseInt(e.currentTarget.dataset.col) };
    const isValidMove = handleMove(sourceSquare, targetSquare);

    if (isValidMove) {
        if (isValidMove.captured) {
            if (myColor === "w") {
                you.innerText += " " + getPieceUnicode({ type: isValidMove.captured });
            } else {
                player.innerText += " " + getPieceUnicode({ type: isValidMove.captured });
            };
        }
        socket.emit("move", isValidMove);
        updateUI();
        renderBoard();
        checkGameOver();
    }

    dragPiece = null;
    sourceSquare = null;
}

updateUI();
renderBoard();