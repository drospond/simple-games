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
  state = {
    word: [],
    guess: [],
    letterBank: [],
    wrongGuesses: 0,
  };

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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value.toUpperCase().split(''),
      error: false
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if(/^(\w ?[,'-]?){4,64}$/.test(this.state.word.join(''))){
        document.getElementById('hang-man-form').className = "hidden";
        console.log("SUBMIT!!");
    }else{
        this.setState({
            error: "Invalid entry. Word/phrase can't contain special characters other than a comma, appostrophe, or dash and must be less that 64 characters."
        })
    }
  };

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
          <div id="hang-man-board">
            {this.props.playerNumber == 1 && (
              <form onSubmit={e=>this.handleSubmit(e)} id="hang-man-form">
                <h4 id="hang-man-question">Choose a word or phrase</h4>
                <input
                  type="text"
                  className="form-control"
                  id="hangManWordInput"
                  name="word"
                  onChange={this.handleChange}
                />
                <button type="submit" id="submit-word" class="btn btn-primary">
                  Submit
                </button>
              </form>
            )}
            <div className="hang-piece hang-base"></div>
            <div className="hang-piece hang-staff"></div>
            <div className="hang-piece hang-reach"></div>
            <div className="hang-piece hang-rope"></div>
            <div className="hang-head"></div>
            <div className="hang-piece hang-body"></div>
            <div className="hang-piece hang-arm-l"></div>
            <div className="hang-piece hang-arm-r"></div>
            <div className="hang-piece hang-leg-l"></div>
            <div className="hang-piece hang-leg-r"></div>
            <div className="hang-piece letter-line"></div>
          </div>
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
