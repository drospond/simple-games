import React, { useEffect, useState } from "react";
import "./GameCard.scss";
import { Link } from "react-router-dom";
import { joinRoom } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import socket from "../../socket.io";

const GameCard = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("assignRoom", (assignedRoom) => {
      dispatch(joinRoom(assignedRoom));
      sessionStorage.setItem("room", assignedRoom);
      socket.emit('join', assignedRoom);
    });
  }, []);

  const joinSocket = () => {
    socket.emit("requestRoom");
  };

  return (
    <div class="card game-card text-center">
      <img
        src="https://via.placeholder.com/280X180"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title">Test Game</h5>
        <Link
          to={props.link}
          class="btn btn-primary"
          onClick={() => joinSocket()}
        >
          Start Game
        </Link>
        <input id="room-code-input" type="text" className="form-control" placeholder="Room Code"/>
        <Link
          to={props.link}
          class="btn btn-primary"
          onClick={() => console.log("joining game")}
        >
          Join Game
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
