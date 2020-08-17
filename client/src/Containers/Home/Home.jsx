import React, { Component } from "react";
import "./Home.scss";
import GameCard from "../../Components/GameCard/GameCard";
import ticTacToeImage from "../../media/tic-tac-toe.PNG";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row title-row">
          <h1 className="title">Simple Games</h1>
        </div>
        <div className="row card-row">
          <GameCard link="/TicTacToe" img={ticTacToeImage} title="Tic-Tac-Toe"/>
        </div>
      </div>
    );
  }
}

export default Home;
