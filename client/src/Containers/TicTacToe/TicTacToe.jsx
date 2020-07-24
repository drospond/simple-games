import React, { Component } from "react";
import GameChat from "../../Components/GameChat/GameChat";
import { joinRoom } from "../../Redux/actions";
import { connect } from "react-redux";
import socket from "../../socket.io";

class TicTacToe extends Component {
  componentDidMount() {
    const room = sessionStorage.getItem("room");
    if (room) {
      this.props.joinRoom(room);
      socket.emit("join", room);
    }
  }
  //Leave room on unmount

  render() {
    return (
      <div className="container">
        <div className="row title-row">
          <h1 className="title">Tic-Tac-Toe</h1>
        </div>
        <div className="row">
          {/* <h4>{display room code}</h4> */}
        </div>
        <div className="row">
          <GameChat socket={socket} />
        </div>
      </div>
    );
  }
}

export default connect(null, { joinRoom })(TicTacToe);
