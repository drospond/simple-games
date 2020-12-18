const io = require("socket.io-client");
const ENDPOINT = "/";

const socket = io(ENDPOINT);

export default socket;