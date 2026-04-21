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
        checkGameOver();
    }
    renderBoard();
    dragPiece = null;
    sourceSquare = null;
}

updateUI();
renderBoard();