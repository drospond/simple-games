import React, { Component } from "react";
import GameChat from "../../Components/GameChat/GameChat";
import { joinRoom, assignPlayerumber } from "../../Redux/actions";
import { connect } from "react-redux";
import socket from "../../socket.io";
import "./HangMan.scss";
import Axios from "axios";

function mapStateToProps(state) {
  const { roomCode, playerNumber, signInState } = state;
  return {
    roomCode: roomCode,
    playerNumber: playerNumber,
    signInState: signInState,
  };
}

class HangMan extends Component {
  state = {};

  componentDidMount() {
    const room = sessionStorage.getItem("room");
    const playerNumber = sessionStorage.getItem("playerNumber");
    if (playerNumber) {
      this.props.assignPlayerumber(playerNumber);
    }
    if (room) {
      this.props.joinRoom(room);
      socket.emit("join", room);
    }

    // socket.on("board update", (data) => {
    //   console.log('board update: ', data);
    //   this.setState({ board: data.board });
    //   this.checkWinner(data.player);
    //   if (data.player === "1") {
    //     this.setState({ playerTurn: 2 });
    //   } else {
    //     this.setState({ playerTurn: 1 });
    //   }
    // });

    // socket.on("reset board", () => {
      
    // });
  }

  render() {
    return (
      <div className="container">
        <div className="row title-row">
          <h1 className="title">Hang Man</h1>
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

export default connect(mapStateToProps, { joinRoom, assignPlayerumber })(
  HangMan
);
