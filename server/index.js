const express = require("express");
const app = express();

const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const players = {};
const rooms = {};

io.on("connection", (socket) => {
  console.log(`User connect: ${socket.id}`);

  socket.on("join_make_room", (data) => {
    const { name, room } = data;
    if (rooms[room]) {
      const roomPlayers = rooms[room].playars;
      if (roomPlayers.length < 2) {
        roomPlayers.push({ socketId: socket.id, name });
        players[socket.id] = { name, room, onMove: false };
        socket.join(room);
        socket.emit("room_joined", room);
        console.log(`room: ${room} name: ${name} joined.`);
        if (rooms[room].playars.length === 2) {
          const firstMove = Math.round(Math.random());
          roomPlayers[firstMove].onMove = true;
          const dataToSend = {
            playarsNames: roomPlayers.map((player) => player.name),
            firstMove: roomPlayers[firstMove].name,
          };
          io.in(room).emit("start_game", dataToSend);

          console.log("start_game");
        }
      } else {
        socket.emit("room_full");
        console.log("room_full");
      }
    } else {
      rooms[room] = { playars: [{ socketId: socket.id, name }] };
      players[socket.id] = { name, room };
      socket.join(room);
      console.log(`room: ${room} name: ${name} joined.`);
      socket.emit("room_joined", room);
    }

    socket.on("player_move", (data) => {
      const { room } = data;

      const roomPlayers = rooms[room].playars;
      const currentPlayer = roomPlayers.find((player) => player.onMove);
      if (currentPlayer && currentPlayer.socketId === socket.id) {
        const opponent = roomPlayers.find(
          (player) => player.socketId !== socket.id
        );

        if (opponent) {
          io.to(opponent.socketId).emit("opponent_move", data);
          currentPlayer.onMove = false;
          opponent.onMove = true;
        }
      }
    });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
