import { joinRoom, assignPlayerumber } from "../../Redux/actions";

const storeRoomInfo = (room, dispatch) => {
  dispatch(joinRoom(room));
  sessionStorage.setItem("room", room);
};

const initializeRoomListeners = function (socket, dispatch) {
  socket.on("assignRoom", (assignedRoom) => {
    storeRoomInfo(assignedRoom, dispatch);
  });

  socket.on("join permission", ({ roomExists, room, playerNumber }) => {
    if (roomExists) {
      storeRoomInfo(room, dispatch)
      dispatch(assignPlayerumber(playerNumber));
      sessionStorage.setItem("playerNumber", playerNumber);
      socket.emit("join room", room);
    } else {
      console.log(`Room ${room} does not exits`);
      //TODO add error display for room not existing
    }
  });
};

export { initializeRoomListeners };
