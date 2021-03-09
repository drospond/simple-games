import React, { useEffect, useState } from "react";
import "./GameCard.scss";
import { Link } from "react-router-dom";
import { joinRoom, assignPlayerumber } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import socket from "../../socket.io";

const GameCard = (props) => {
  const [roomCode, setRoomCode] = useState("");

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { value } = event.target;
    setRoomCode(value);
  };

  const joinSocket = () => {
    dispatch(assignPlayerumber(1));
    sessionStorage.setItem("playerNumber", 1);
    socket.emit("requestRoom");
  };

  const joinExistingSocket = () => {
    socket.emit("join existing room", roomCode);
  };

  return (
    <div className="card game-card text-center">
      <img src={props.img} className="card-img-top" alt={props.title} />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <Link
          to={props.link}
          className="btn btn-primary"
          onClick={() => joinSocket()}
        >
          Start Game
        </Link>
        <input
          type="text"
          className="form-control room-code-input"
          placeholder="Room Code"
          onChange={(event) => handleInputChange(event)}
        />
        <Link
          to={props.link}
          className="btn btn-primary"
          onClick={() => joinExistingSocket()}
        >
          Join Game
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
