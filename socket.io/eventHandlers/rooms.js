const initialize = function (io, socket, roomArray) {
  socket.on("requestRoom", () => {
    const randString = Math.random().toString(36);
    let roomCode = randString.substring(randString.length - 4);
    roomArray.push(roomCode);
    socket.emit("assignRoom", roomCode);
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
};

exports.initialize = initialize;
