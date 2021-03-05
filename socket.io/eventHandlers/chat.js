const initialize = function(io, socket){
    socket.on("chat message", (data) => {
        console.log(data);
        io.to(data.room).emit("chat message", {
          id: data.id,
          msg: data.msg,
          user: data.user,
        });
      });
}

exports.initialize = initialize;