require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 3001;

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
    currentPort: PORT,
  });
});

app.use(express.static("client/build"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/simpleGamesDB",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  }
);
const userController = require("./Controllers/userController");
app.use("/api/users", userController);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const roomArray = [];

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (data) => {
    console.log(data);
    io.to(data.room).emit("chat message", { msg: data.msg, user: data.user });
  });

  socket.on("join", (room) => {
    Object.keys(socket.rooms).forEach((room) => {
      socket.leave(room);
    });
    socket.join(room);
    console.log("user joined " + room);
    if (socket.adapter.rooms[room]) {
      console.log("players in room: ", socket.adapter.rooms[room].length);
    }
  });

  socket.on("requestRoom", () => {
    console.log("requesting room");
    let roomCode = Math.random().toString(36).substring(8);
    roomArray.push(roomCode);
    socket.emit("assignRoom", roomCode);
  });

  socket.on("join existing room", (room) => {
    console.log("joining existing room", room);
    const roomExists = roomArray.includes(room);
    let playerNumber;
    console.log("Socket stuff: ", socket.adapter.rooms[room]);
    if (socket.adapter.rooms[room]) {
      playerNumber = `${socket.adapter.rooms[room].length + 1}`;
    } else {
      playerNumber = "error";
    }
    socket.emit("join permission", { roomExists, room, playerNumber });
  });

  socket.on("player move", (data) => {
    io.to(data.room).emit("board update", data);
  });

  socket.on("play again", (data) => {
    io.to(data.room).emit("reset board");
  });

  socket.on("set word", (data) => {
    console.log(`Setting word to ${data.word}`);
    io.to(data.room).emit("set word", data);
  });

  socket.on("guess letter", (data) => {
    console.log(`Guessing letter "${data.letter}"`);
    io.to(data.room).emit("letter guess", data);
  });

  socket.on("hang man reset", (data) => {
    console.log(`Resetting board for room ${data.room}`);
    io.to(data.room).emit("hang man reset", data);
  });
});

server.listen(PORT, () => {
  console.log(`Express App is running on http://localhost:${PORT}`);
});
