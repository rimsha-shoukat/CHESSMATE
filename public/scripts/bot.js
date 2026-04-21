function handleDrop(e) {
    e.preventDefault();
    if (!dragPiece) return;
    const targetSquare = { row: parseInt(e.currentTarget.dataset.row), col: parseInt(e.currentTarget.dataset.col) };
    const isValidMove = handleMove(sourceSquare, targetSquare);
    if (isValidMove) {
        const capturedPieceSymbol = getPieceUnicode({ type: isValidMove.captured });
        if (isValidMove.captured) {
            if (chess.turn() === 'b') {
                you.innerText += " " + capturedPieceSymbol;
            } else {
                player.innerText += " " + capturedPieceSymbol;
            }
        }
        updateUI();
        renderBoard();
        checkGameOver();
        if (!chess.game_over()) {
            setTimeout(makeBotMove, 500);
        }
    }
    dragPiece = null;
    sourceSquare = null;
}

function makeBotMove() {
    const possibleMoves = chess.moves();
    if (chess.game_over() || possibleMoves.length == 0) return;
    const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    const moved = chess.move(move);
    if (moved.captured) {
        const capturedPieceSymbol = getPieceUnicode({ type: moved.captured });
        player.innerText += " " + capturedPieceSymbol;
    }
    updateUI();
    renderBoard();
    checkGameOver();
}

updateUI();
renderBoard();