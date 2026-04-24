# ChessMate ♟️

A classic chess experience with online matchmaking, friend duels, and AI bot battles — all from one sleek board.

---

### [click to view live](https://chessmate-six.vercel.app/)
>  "Play Online" is currently disabled as Vercel does not support the WebSockets required for live matchmaking.

## Features

- **Play with Friend** — take turns on the same device
- **Play Online** — get matched with another player in real time via Socket.io
- **Play vs Bot** — challenge opponent that always plays the best available move

---

## Tech Stack

- **Backend** — Node.js, Express
- **Templating** — EJS
- **Real-time** — Socket.io
- **Chess Logic** — chess.js

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/rimsha-shoukat/chessmate.git
cd chessmate

# Install dependencies
npm install

# Start the server
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

## Project Structure

```
chessmate/
├── views/
│   ├── home.ejs        # Landing page with mode selection
│   └── game.ejs        # Chess board UI
├── public/
│   └── js/
│       ├── game.js     # Core chess logic & board rendering
│       ├── bot.js      # Best move logic
│       └── socket.js   # Online multiplayer logic
├── routes/
│   └── index.js
├── server.js
└── package.json
```
