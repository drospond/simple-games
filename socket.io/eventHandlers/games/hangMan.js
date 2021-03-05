const initialize = function(io, socket){
    socket.on("set word", (data) => {
        io.to(data.room).emit("set word", data);
      });
  
      socket.on("guess letter", (data) => {
        io.to(data.room).emit("letter guess", data);
      });
  
      socket.on("hang man reset", (data) => {
        io.to(data.room).emit("hang man reset", data);
      });
}

exports.initialize = initialize;