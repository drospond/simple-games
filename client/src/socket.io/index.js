import { initializeRoomListeners } from "./eventHandlers/rooms";

const io = require("socket.io-client");
const ENDPOINT = "/";

const socket = io(ENDPOINT);
socket.initializeListeners = function(dispatch){
    console.log("index level dispatch: ", dispatch);
    initializeRoomListeners(this, dispatch);
    console.log("this is what this is: ", this);
}

export default socket;