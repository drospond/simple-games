const socketIO = require("socket.io");

function setUpSocket(server){
  const io = socketIO(server);
  const roomArray = [];

  io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("chat message", (data) => {
      console.log(data);
      io.to(data.room).emit("chat message", {
        id: data.id,
        msg: data.msg,
        user: data.user,
      });
    });

    socket.on("clear rooms", (assignedRoom) => {
      Object.keys(socket.rooms).forEach((room) => {
        socket.leave(room);
      });
      socket.emit("trigger join", assignedRoom);
    });

    socket.on("join", (room) => {
      socket.join(room);
      console.log("user joined " + room);
    });

    socket.on("requestRoom", () => {
      const randString = Math.random().toString(36);
      let roomCode = randString.substring(randString.length - 4);
      roomArray.push(roomCode);
      socket.emit("assignRoom", roomCode);
    });

    socket.on("join existing room", (room) => {
      console.log("joining existing room", room);
      const roomExists = roomArray.includes(room);
      let playerNumber;
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
      io.to(data.room).emit("set word", data);
    });

    socket.on("guess letter", (data) => {
      io.to(data.room).emit("letter guess", data);
    });

    socket.on("hang man reset", (data) => {
      io.to(data.room).emit("hang man reset", data);
    });
  });
};

exports.setUpSocket = setUpSocket;