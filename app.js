const express = require('express');
const socket = require('socket.io');
const http = require("http");
const { Chess } = require("chess.js");
const path = require('path');

const app = express();
const server = http.createServer(app);

const io = socket(server);

const chess = new Chess();
let players = {};

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", { title: "Chess Game" });
});

io.on("connection", (uniquesocket) => {
    console.log("connected");
    
    // Assign player roles
    if (!players.white) {
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole", "w");  // Changed "W" to "w" to match chess.js color notation
    } else if (!players.black) {
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole", "b");
    } else {
        uniquesocket.emit("spectatorRole");
    }

    // Handle player disconnection
    uniquesocket.on("disconnect", () => {
        if (uniquesocket.id === players.white) {
            delete players.white;
        } else if (uniquesocket.id === players.black) {
            delete players.black;
        }
    });

    // Handle move event
    uniquesocket.on("move", (move) => {
        try {
            // Check if the correct player is making the move
            if (chess.turn() === 'w' && uniquesocket.id !== players.white) return;
            if (chess.turn() === 'b' && uniquesocket.id !== players.black) return;

            // Make the move
            const result = chess.move(move);
            if (result) {
                // Broadcast the move and the updated board state
                io.emit("move", move);
                io.emit("boardState", chess.fen());  // Invoke chess.fen() to get the actual FEN string
            } else {
                console.log("Invalid move: ", move);
                uniquesocket.emit("invalidMove", move);
            }
        } catch (err) {  // Added error parameter to catch block
            console.error("Error processing move: ", err);
            uniquesocket.emit("invalidMove", move);
        }
    });
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
