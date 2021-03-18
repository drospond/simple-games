import React, { Component } from "react";
import GameChat from "../../Components/GameChat/GameChat";
import { joinRoom, assignPlayerumber } from "../../Redux/actions";
import { connect } from "react-redux";
import socket from "../../socket.io";
import "./HangMan.scss";
import Axios from "axios";
import StickMan from "./Components/StickMan";
import WordForm from "./Components/WordForm";
import GuessForm from "./Components/GuessForm";
import HangWord from "./Components/HangWord";

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
    guesses: [],
    wrongGuesses: 0,
    winCondition: false,
    lossCondition: false,
    leadPlayerNumber: 1,
    guessingPlayerNumber: 2,
    gameStart: false,
  };

  componentDidMount() {
    //TODO: need new code to reconnect after a disconnect
    const room = sessionStorage.getItem("room");
    const playerNumber = sessionStorage.getItem("playerNumber");
    if (playerNumber) {
      this.props.assignPlayerumber(playerNumber);
    }
    if (room) {
      this.props.joinRoom(room);
    }
    //TODO: may need to clean up event listeners on unmount
    socket.on("set word", (data) =>{
      this.setState({
        word: data.word,
        gameStart: true,
      })
    })

    socket.on("letter guess", (data) => {
      this.handleGuess(data.letter);
    })

    socket.on("hang man reset", () => {
      this.resetBoard();
    })
  }

  handleChangeWord = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value.toUpperCase().split(""),
      error: false,
    });
  };

  handleChangeLetter = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value.toUpperCase(),
      error: false,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (/^([A-Z][,'-]? ?){4,64}$/.test(this.state.word.join(""))) {
      socket.emit("set word", {
        player: this.props.playerNumber,
        word: this.state.word,
        room: this.props.roomCode
      });
    } else {
      this.setState({
        error:
          "Invalid entry. Word/phrase can't contain special characters other than a comma, appostrophe, or dash and must be less that 64 characters.",
      });
    }
  };
  
  updateWins(){
    Axios.get(`/api/users/updateWins/hangMan/${this.props.signInState.user.userObject._id}`);
  }
  updateLosses(){
    Axios.get(`/api/users/updateLosses/hangMan/${this.props.signInState.user.userObject._id}`);
  }

  checkWin = () => {
    let winCondition = true;
    this.state.word.forEach((letter) => {
      if (/[a-zA-z]{1}/.test(letter) && !this.state.guesses.includes(letter)) {
        winCondition = false;
      }
    });
    if (winCondition) {
      if(this.props.signInState.user && Number(this.props.playerNumber) === Number(this.state.leadPlayerNumber)){
        this.updateLosses();
      }else if(this.props.signInState.user && Number(this.props.playerNumber) === Number(this.state.guessingPlayerNumber)){
        this.updateWins();
      }
      this.setState({
        winCondition: winCondition,
      });
    }
  };

  checkLoss = () => {
    if (this.state.wrongGuesses === 6) {
      if(this.props.signInState.user && Number(this.props.playerNumber) === Number(this.state.guessingPlayerNumber)){
        this.updateLosses();
      }else if(this.props.signInState.user && Number(this.props.playerNumber) === Number(this.state.leadPlayerNumber)){
        this.updateWins();
      }
      this.setState({
        lossCondition: true,
      });
    }
  };

  handleGuess = (letter) => {
    if (!this.state.word.includes(letter)) {
      this.setState({
        wrongGuesses: this.state.wrongGuesses + 1,
      });
    }
    this.setState({
        guesses: this.state.guesses.concat(letter),
      },
      () => {
        this.checkWin();
        this.checkLoss();
      }
    );
  };

  resetBoard = () => {
    const newLead = this.state.guessingPlayerNumber;
    const newGuesser = this.state.leadPlayerNumber;
    this.setState({
      word: [],
      guesses: [],
      wrongGuesses: 0,
      winCondition: false,
      lossCondition: false,
      gameStart: false,
      leadPlayerNumber: newLead,
      guessingPlayerNumber: newGuesser,
    }, () => {
      if(document.getElementById("hang-man-form")){
        document.getElementById("hang-man-form").reset();
      }
    });
  };

  emitBoardResest = () => {
    socket.emit("hang man reset", {
      player: this.props.playerNumber,
      room: this.props.roomCode
    })
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
          <div id="hang-man-board" className="col">
            {Number(this.props.playerNumber) === Number(this.state.leadPlayerNumber) && !this.state.gameStart && (
              <WordForm error={this.state.error} handleChangeWord={this.handleChangeWord} handleSubmit={this.handleSubmit}/>
            )}
            {this.state.gameStart && 
            <div id="game-start-wrapper">
              <div className="row">
                <div className="col">
                  <StickMan wrongGuesses={this.state.wrongGuesses}/>
                </div>
                <div className="col-9" id="right-board-wrapper">
                  <div className="row guessed-letter-section">
                    {this.state.guesses.map((letter) => {
                      if (!this.state.word.includes(letter)) {
                        return letter;
                      }
                      return "";
                    })}
                  </div>
                  <div id="word-section" className="row">
                    <HangWord guesses={this.state.guesses} word={this.state.word}/>
                  </div>
                </div>
              </div>
              <div id="guess-section">
                {!this.state.winCondition && !this.state.lossCondition && Number(this.state.guessingPlayerNumber) === Number(this.props.playerNumber) && (
                  <GuessForm guesses={this.state.guesses}/>
                )}
                {this.state.winCondition && (
                  <h2 className="hang-end-display">
                    Saved from hanging!{" "}
                    <span
                      className="play-again-switch"
                      onClick={() => {this.emitBoardResest()}}
                    >
                      Play Again?
                    </span>
                  </h2>
                )}
                {this.state.lossCondition && (
                  <h2 className="hang-end-display">
                    The poor man has been hanged!{" "}
                    <span
                      className="play-again-switch"
                      onClick={() => this.emitBoardResest()}
                    >
                      Play Again?
                    </span>
                  </h2>
                )}
              </div>
            </div>}
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