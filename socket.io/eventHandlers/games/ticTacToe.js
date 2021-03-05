const initialize = function(io, socket){
    socket.on("player move", (data) => {
        io.to(data.room).emit("board update", data);
      });
  
      socket.on("play again", (data) => {
        io.to(data.room).emit("reset board");
      });
}

exports.initialize = initialize;