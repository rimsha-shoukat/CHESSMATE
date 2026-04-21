const stockfish = new Worker("/scripts/stockfish.js");
stockfish.postMessage("uci");

stockfish.onmessage = function (e) {
    if (!e.data.startsWith("bestmove")) return;
    console.log(e.data)
    const best = e.data.split(" ")[1];
    const moved = chess.move({ from: best.slice(0, 2), to: best.slice(2, 4), promotion: "q" });
    if (!moved) return;
    if (moved.captured) player.innerText += " " + getPieceUnicode({ type: moved.captured });

    updateUI();
    renderBoard();
    checkGameOver();
};

function makeBotMove() {
    if (chess.game_over()) return;
    stockfish.postMessage("position fen " + chess.fen());
    stockfish.postMessage("go depth 10");
}

function handleDrop(e) {
    e.preventDefault();
    if (!dragPiece) return;

    const targetSquare = { row: parseInt(e.currentTarget.dataset.row), col: parseInt(e.currentTarget.dataset.col) };
    const isValidMove = handleMove(sourceSquare, targetSquare);

    if (isValidMove) {
        if (isValidMove.captured) {
            if (chess.turn() === 'b') you.innerText += " " + getPieceUnicode({ type: isValidMove.captured });
            else player.innerText += " " + getPieceUnicode({ type: isValidMove.captured });
        }
        updateUI();
        renderBoard();
        checkGameOver();
        if (!chess.game_over()) setTimeout(makeBotMove, 1000);
    }

    dragPiece = null;
    sourceSquare = null;
}

updateUI();
renderBoard();