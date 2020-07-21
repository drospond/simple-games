import React from "react";
import './GameCard.scss';

const GameCard = (props) => {
  return (
    <div class="card game-card text-center">
      <img src="https://via.placeholder.com/280X180" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">Test Game</h5>
        <a href={props.link} class="btn btn-primary">
          Play Game
        </a>
      </div>
    </div>
  );
};

export default GameCard;
