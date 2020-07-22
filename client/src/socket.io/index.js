const io = require("socket.io-client");
const ENDPOINT = "http://localhost:3001/";

const socket = io(ENDPOINT);

export default socket;