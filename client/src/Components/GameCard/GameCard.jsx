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
    const {value} = event.target;
    setRoomCode(value);
  }

  useEffect(() => {
    socket.on("assignRoom", (assignedRoom) => {
      dispatch(joinRoom(assignedRoom));
      sessionStorage.setItem("room", assignedRoom);
      socket.emit('join', assignedRoom);
    });
    socket.on("join permission", ({roomExists, room, playerNumber}) => {
      if(roomExists){
        dispatch(joinRoom(room));
        sessionStorage.setItem("room", room);
        dispatch(assignPlayerumber(playerNumber));
        sessionStorage.setItem("playerNumber", playerNumber);
        socket.emit('join', room);
      }else{
        console.log(`Room ${room} does not exits`)
      }
    })
  }, []);

  const joinSocket = () => {
    socket.emit("requestRoom");
    dispatch(assignPlayerumber(1));
    sessionStorage.setItem("playerNumber", 1);
  };

  const joinExistingSocket = () => {
    socket.emit("join existing room", roomCode);
  }

  return (
    <div className="card game-card text-center">
      <img
        src="https://via.placeholder.com/280X180"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">Test Game</h5>
        <Link
          to={props.link}
          className="btn btn-primary"
          onClick={() => joinSocket()}
        >
          Start Game
        </Link>
        <input id="room-code-input" type="text" className="form-control" placeholder="Room Code" onChange={(event)=>handleInputChange(event)}/>
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
