import React, { Component } from "react";
import GameChat from "../../Components/GameChat/GameChat";
import { joinRoom } from "../../Redux/actions";
import { connect } from "react-redux";
import socket from "../../socket.io";
import './TicTacToe.scss';

function mapStateToProps(state) {
    const { roomCode } = state
    return { roomCode: roomCode }
  }

class TicTacToe extends Component {
  componentDidMount() {
    console.log(this);
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
          <h4 id="room-code">Room: {this.props.roomCode}</h4>
        </div>
        <div className="row">
          <GameChat socket={socket} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { joinRoom })(TicTacToe);
