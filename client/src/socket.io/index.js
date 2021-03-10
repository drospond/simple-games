import { initializeRoomListeners } from "./eventHandlers/rooms";

const io = require("socket.io-client");
const ENDPOINT = "/";

const socket = io(ENDPOINT);
socket.initializeListeners = function(dispatch){
    initializeRoomListeners(this, dispatch);
}

export default socket;