import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./GameChat.scss";
const socket = require("../../socket.io");

const GameChat = () => {
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const room = useSelector((state) => state.roomCode);

  socket.default.on("chat message", function (msg) {
    console.log("Message: ", msg);
    // let newMessageArray = messageArray;
    // newMessageArray.push(msg);
    // setMessageArray(newMessageArray);
  });

  const handleInputChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(message);
    socket.default.emit("chat message", {
      msg: message,
      room: room,
    });
    document.getElementById("chat-box").value = "";
    setMessage("");
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div class="form-group">
        <label for="chat-box">Messages:</label>
        {messageArray.map((message) => {
          return <p>{message}</p>;
        })}
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
