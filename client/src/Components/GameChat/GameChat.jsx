import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./GameChat.scss";
import { useEffect } from "react";

const GameChat = (props) => {
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const room = useSelector((state) => state.roomCode);

//   useEffect(() => {
    props.socket.on("chat message", function (msg) {
    //   let newMessageArray = messageArray;
    //   messageArray.push(msg);
      setMessageArray([...messageArray, msg]);
    });
//   }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.socket.emit("chat message", {
      msg: message,
      room: room,
    });
    document.getElementById("chat-box").value = "";
    setMessage("");
  };

  const updateScroll = () => {
    var element = document.getElementById("sent-messages");
    element.scrollTop = element.scrollHeight;
  };

  useEffect(() => {
    updateScroll();
  }, [messageArray]);

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="form-group">
        <label htmlFor="chat-box">Messages:</label>
        <div id="sent-messages">
          {messageArray.map((message) => {
            return <p>{message}</p>;
          })}
        </div>
        <input
          className="form-control"
          type="text"
          id="chat-box"
          rows="3"
          onChange={(event) => handleInputChange(event)}
        ></input>
      </div>
      <button className="btn">Send</button>
    </form>
  );
};

export default GameChat;
