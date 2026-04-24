const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socket = require("socket.io");
const { Chess } = require("chess.js");
const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let waitingPlayer = null;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/game/:type", (req, res) => {
    const type = req.params.type;
    res.render("game", { type });
})

io.on("connection", function (socket) {
    socket.on("joinGame", () => {
        if (waitingPlayer) {
            waitingPlayer.emit("playerRole", "w");
            socket.emit("playerRole", "b");
            waitingPlayer.opponent = socket;
            socket.opponent = waitingPlayer;
            waitingPlayer = null;
        } else {
            waitingPlayer = socket;
            socket.emit("waiting");
        }
    });

    socket.on("move", (move) => {
        socket.opponent?.emit("move", move);
    });

    socket.on("disconnect", () => {
        if (waitingPlayer?.id === socket.id) waitingPlayer = null;
        socket.opponent?.emit("opponentLeft");
    });
})

const PORT = process.env.PORT || 3000;
server.listen(PORT);
