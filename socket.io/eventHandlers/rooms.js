const initialize = function (io, socket, roomArray) {
  socket.on("join room", (roomToJoin) => {
    Object.keys(socket.rooms).forEach((room) => {
      socket.leave(room);
      console.log(`User left room ${room}`);
    });
    let roomCode;
    if(!roomToJoin){
      const randString = Math.random().toString(36);
      roomCode = randString.substring(randString.length - 4);
      roomArray.push(roomCode);
    }else{
      roomCode = roomToJoin;
    }
    socket.join(roomCode);
    console.log(`User joined room ${roomCode}`);
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
};

exports.initialize = initialize;
