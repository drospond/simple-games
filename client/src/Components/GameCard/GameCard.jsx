import React from "react";
import './GameCard.scss';
import { Link } from 'react-router-dom';
const io = require('socket.io');

const GameCard = (props) => {
  const joinSocket = () =>{
    console.log("joining socket");
  }

  return (
    <div class="card game-card text-center">
      <img src="https://via.placeholder.com/280X180" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">Test Game</h5>
        <Link to={props.link} class="btn btn-primary" onClick={()=>joinSocket()}>
          Play Game
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
