import React, { Component } from "react";
import GameChat from "../../Components/GameChat/GameChat";

class TicTacToe extends Component {
  render() {
    return (
      <div className="container">
        <div className="row title-row">
          <h1 className="title">Tic-Tac-Toe</h1>
        </div>
        <div className="row">
          <GameChat/>
        </div>
      </div>
    );
  }
}

export default TicTacToe;
