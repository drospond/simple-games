import React from "react";
import './GameCard.scss';
import { Link } from 'react-router-dom';
import {joinRoom} from '../../Redux/actions';
import {useDispatch} from 'react-redux';
const socket = require('../../socket.io/');
// const io = require('socket.io-client');
// const ENDPOINT = 'http://localhost:3001/'

const GameCard = (props) => {
  // const socket = io(ENDPOINT);
  const dispatch = useDispatch();

  const joinSocket = () =>{
    console.log("joining socket");
    dispatch(joinRoom("room1"));
    socket.default.emit('join', 'room1');
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
