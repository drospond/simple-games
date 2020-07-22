import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./GameChat.scss";
import { useEffect } from "react";
const io = require("socket.io-client");
const ENDPOINT = "http://localhost:3001/";

const GameChat = () => {
  let socket;
  const [message, setMessage] = useState("");
  const room = useSelector((state) => state.roomCode);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("chat message", function (msg) {
        console.log("Message: ", msg);
      });
  });

  const handleInputChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(message);
    socket.emit("chat message", {
      msg: message,
      room: room,
    });
    setMessage("");
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div class="form-group">
        <label for="chat-box">Messages:</label>
        <textarea
          class="form-control"
          id="chat-box"
          rows="3"
          onChange={(event) => handleInputChange(event)}
        ></textarea>
      </div>
      <button className="btn">Send</button>
    </form>
  );
};

export default GameChat;
