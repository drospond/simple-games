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
    guesses: [],
    letterGuess: "",
    wrongGuesses: 0,
    winCondition: false,
    lossCondition: false,
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
    if (/^(\w ?[,'-]?){4,64}$/.test(this.state.word.join(""))) {
      document.getElementById("hang-man-form").className = "no-display";
      document
        .getElementById("game-start-wrapper")
        .classList.remove("no-display");
    } else {
      this.setState({
        error:
          "Invalid entry. Word/phrase can't contain special characters other than a comma, appostrophe, or dash and must be less that 64 characters.",
      });
    }
  };

  checkWin = () => {
    let winCondition = true;
    this.state.word.forEach((letter) => {
      if (/[a-zA-z]{1}/.test(letter) && !this.state.guesses.includes(letter)) {
        winCondition = false;
      }
    });
    if (winCondition) {
      this.setState({
        winCondition: winCondition,
      });
    }
  };

  checkLoss = () => {
    if (this.state.wrongGuesses === 6) {
      this.setState({
        lossCondition: true,
      });
      document.getElementById("guess-form").className = "no-display";
      //   document.getElementById('guess-form').className = 'no-display';
    }
  };

  handleGuess = (event) => {
    event.preventDefault();
    if (!/[a-zA-z]{1}/.test(this.state.letterGuess)) {
      document.getElementById("guess-form").reset();
      return this.setState({
        error: "Must guess a letter!",
      });
    }
    if (this.state.guesses.includes(this.state.letterGuess)) {
      document.getElementById("guess-form").reset();
      return this.setState({
        error: "Letter already guessed!",
      });
    }
    if (!this.state.word.includes(this.state.letterGuess)) {
      this.setState({
        wrongGuesses: this.state.wrongGuesses + 1,
      });
    }
    this.setState(
      {
        guesses: this.state.guesses.concat(this.state.letterGuess),
      },
      () => {
        this.checkWin();
        this.checkLoss();
      }
    );
    document.getElementById("guess-form").reset();
  };

  resetBoard = () => {
    document.getElementById("hang-man-form").classList.remove("no-display");
    document.getElementById("game-start-wrapper").classList.add("no-display");
    this.setState({
      word: [],
      guesses: [],
      letterGuess: "",
      wrongGuesses: 0,
      winCondition: false,
      lossCondition: false,
    });
    document.getElementById("hang-man-form").reset();
  };

  hangManPieces = [
    <div className="hang-head"></div>,
    <div className="hang-piece hang-body"></div>,
    <div className="hang-piece hang-arm-l"></div>,
    <div className="hang-piece hang-arm-r"></div>,
    <div className="hang-piece hang-leg-l"></div>,
    <div className="hang-piece hang-leg-r"></div>,
  ];

  render() {
    const renderedHangManPieces = [];
    for (let i = 0; i < this.state.wrongGuesses; i++) {
      renderedHangManPieces.push(this.hangManPieces[i]);
    }

    let singleWord = [];
    const hangPhrase = [];
    this.state.word.forEach((letter, index) => {
      let letterClass = "";
      if (/[ ]/.test(letter)) {
        letter = "___";
        letterClass = "hidden";
      }
      if (/[A-Z]/.test(letter) && !this.state.guesses.includes(letter)) {
        letterClass = "hidden";
      }
      if (/[_+'-]/.test(letter)) {
        return hangPhrase.push(
          <div className="hang-letter">
            <div className={letterClass}>{letter}</div>
          </div>
        );
      }
      if (
        index === this.state.word.length - 1 ||
        this.state.word[index + 1] === " "
      ) {
        singleWord.push(
          <div className="hang-letter">
            <div className={letterClass}>{letter}</div>
            <div className="hang-piece letter-line"></div>
          </div>
        );
        hangPhrase.push(<div className="hang-word">{singleWord}</div>);
        singleWord = [];
      } else {
        singleWord.push(
          <div className="hang-letter">
            <div className={letterClass}>{letter}</div>
            <div className="hang-piece letter-line"></div>
          </div>
        );
      }
    });

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
            {this.props.playerNumber == 1 && (
              <form onSubmit={(e) => this.handleSubmit(e)} id="hang-man-form">
                <h4 className="hang-man-question">Choose a word or phrase</h4>
                <input
                  type="text"
                  className="form-control"
                  id="hangManWordInput"
                  name="word"
                  autoComplete="off"
                  onChange={this.handleChangeWord}
                />
                <button type="submit" id="submit-word" class="btn btn-primary">
                  Submit
                </button>
              </form>
            )}
            <div id="game-start-wrapper" className="no-display">
              <div className="row">
                <div className="col">
                  <div id="man-section">
                    <div className="hang-piece hang-base"></div>
                    <div className="hang-piece hang-staff"></div>
                    <div className="hang-piece hang-reach"></div>
                    <div className="hang-piece hang-rope"></div>
                    {renderedHangManPieces}
                  </div>
                </div>
                <div className="col-9">
                  <div className="guessed-letter-section">
                    {this.state.guesses.map((letter) => {
                      if (!this.state.word.includes(letter)) {
                        return letter;
                      }
                    })}
                  </div>
                  <div id="word-section">{hangPhrase}</div>
                </div>
              </div>
              <div id="guess-section">
                {!this.state.winCondition && !this.state.lossCondition &&<form
                  id="guess-form"
                  onSubmit={(event) => this.handleGuess(event)}
                >
                  <h4 className="hang-man-question">Guess a Letter</h4>
                  <input
                    type="text"
                    className="form-control"
                    id="hangManLetterInput"
                    name="letterGuess"
                    maxLength="1"
                    autoComplete="off"
                    onChange={this.handleChangeLetter}
                  />
                  <button
                    type="submit"
                    id="submit-letter"
                    class="btn btn-primary"
                  >
                    Guess
                  </button>
                </form>}
                {this.state.winCondition && <h2 className="hang-end-display">
                  You win!{" "}
                  <span className="play-again-switch" onClick = {() => this.resetBoard()}>Play Again?</span>
                </h2>}
                {this.state.lossCondition && <h2 className="hang-end-display">
                  You lose!{" "}
                <span className="play-again-switch" onClick = {() => this.resetBoard()}>Play Again?</span>
                </h2>}
              </div>
            </div>
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
