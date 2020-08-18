import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./GameChat.scss";
import { useEffect, useRef } from "react";

const GameChat = (props) => {
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const ref = useRef(messageArray);
  const room = useSelector((state) => state.roomCode);
  const user = useSelector(state => state.signInState.user);
  const playerNumber = useSelector(state => state.playerNumber);

  useEffect(() => {
    ref.current = messageArray;
  }, [messageArray]);

  useEffect(() => {
    props.socket.on("chat message", function (data) {
      const newMessageArray = ref.current;
      setMessageArray(newMessageArray.concat(data));
    });
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let fromUser;
    if(user){
      fromUser = user.userObject.userName;
    }else{
      fromUser = `Player ${playerNumber}`
    }
    props.socket.emit("chat message", {
      msg: message,
      room: room,
      user: fromUser
    });
    document.getElementById("message-input").value = "";
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
    <form id="chat-form" onSubmit={(event) => handleSubmit(event)}>
      <div className="form-group">
        <label htmlFor="message-input">Messages:</label>
        <div id="sent-messages">
          {messageArray.map((message) => {
            if(user && message.user === user.userObject.userName || message.user === `Player ${playerNumber}`){
              return <div className="chat-block"><p className="current-username">{message.user + ":"}</p><p>{message.msg}</p></div>;
            }else{
              return <div className="chat-block"><p className="other-username">{message.user + ":"}</p><p>{message.msg}</p></div>;
            }
          })}
        </div>
        <input
          className="form-control"
          autoComplete="off"
          type="text"
          id="message-input"
          rows="3"
          onChange={(event) => handleInputChange(event)}
        ></input>
      </div>
      <button className="btn">Send</button>
    </form>
  );
};

export default GameChat;
