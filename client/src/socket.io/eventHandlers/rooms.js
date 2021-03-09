import { joinRoom, assignPlayerumber } from "../../Redux/actions";

const initializeRoomListeners = function(socket, dispatch){
    socket.on("assignRoom", (assignedRoom) => {
        dispatch(joinRoom(assignedRoom));
        sessionStorage.setItem("room", assignedRoom);
        socket.emit("clear rooms", assignedRoom);
      });
      socket.on("join permission", ({ roomExists, room, playerNumber }) => {
        if (roomExists) {
          dispatch(joinRoom(room));
          sessionStorage.setItem("room", room);
          dispatch(assignPlayerumber(playerNumber));
          sessionStorage.setItem("playerNumber", playerNumber);
          socket.emit("clear rooms", room);
        } else {
          console.log(`Room ${room} does not exits`);
          //TODO add error display for room not existing
        }
      });
      socket.on("trigger join", (room) => socket.emit("join", room))
}

export { initializeRoomListeners };