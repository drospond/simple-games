const socketIO = require("socket.io");
const chat = require("./eventHandlers/chat.js");
const rooms = require("./eventHandlers/rooms.js");
const hangMan = require("./eventHandlers/games/hangMan.js");
const ticTacToe = require("./eventHandlers/games/ticTacToe");

function setUpSocket(server){
  const io = socketIO(server);
  const roomArray = [];

  io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    chat.initialize(io, socket);

    rooms.initialize(io, socket, roomArray);

    ticTacToe.initialize(io, socket);

    hangMan.initialize(io, socket);
  });
};

exports.setUpSocket = setUpSocket;