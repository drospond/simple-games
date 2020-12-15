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
    leadPlayerNumber: 1,
    guessingPlayerNumber: 2,
    gameStart: false,
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
    }
  };

  handleGuess = (letter) => {
    if (!/[a-zA-Z]{1}/.test(letter)) {
      if(document.getElementById("guess-form")){
        document.getElementById("guess-form").reset();
      }
      return this.setState({
        error: "Must guess a letter!",
      });
    }
    if (this.state.guesses.includes(letter)) {
      if(document.getElementById("guess-form")){
        document.getElementById("guess-form").reset();
      }
      return this.setState({
        error: "Letter already guessed!",
      });
    }
    if (!this.state.word.includes(letter)) {
      this.setState({
        wrongGuesses: this.state.wrongGuesses + 1,
      });
    }
    this.setState(
      {
        guesses: this.state.guesses.concat(letter),
      },
      () => {
        if (document.getElementById("guess-form")){
          document.getElementById("guess-form").reset();
        }
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
      letterGuess: "",
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

    //gotta clean this stuff up...
    let singleWord = [];
    const hangPhrase = [];
    this.state.word.forEach((letter, index) => {
      let letterClass = "";
      if (/[ ]/.test(letter)) {
        letterClass = "hidden";
        return hangPhrase.push(
          <div className="hang-letter">
            <div className={letterClass}>{"___"}</div>
          </div>
        );
      }
      if (/[A-Z]/.test(letter) && !this.state.guesses.includes(letter)) {
        letterClass = "hidden";
      }
      if (/['\-,]/.test(letter)) {
        singleWord.push(
          <div className="hang-letter">
            <div className={letterClass}>{letter}</div>
          </div>
        );
        if(/[,]/.test(letter)){
          hangPhrase.push(<div className="hang-word">{singleWord}</div>);
          singleWord = [];
          return;
        }
        return;
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
            {this.props.playerNumber == this.state.leadPlayerNumber && !this.state.gameStart && (
              <>
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
              {this.state.error && !this.state.letterGuess && 
              <div className="row hang-error"><h4>{this.state.error}</h4></div>}
              </>
            )}
            {this.state.gameStart && 
            <div id="game-start-wrapper">
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
                <div className="col-9" id="right-board-wrapper">
                  <div className="row guessed-letter-section">
                    {this.state.guesses.map((letter) => {
                      if (!this.state.word.includes(letter)) {
                        return letter;
                      }
                    })}
                  </div>
                  <div id="word-section" className="row">
                    {hangPhrase}
                  </div>
                </div>
              </div>
              <div id="guess-section">
                {!this.state.winCondition && !this.state.lossCondition && this.state.guessingPlayerNumber == this.props.playerNumber && (
                  <>
                  <form
                    id="guess-form"
                    onSubmit={(event) => {
                      event.preventDefault();
                      socket.emit("guess letter", {
                        player: this.props.playerNumber,
                        letter: this.state.letterGuess,
                        room: this.props.roomCode
                      });
                    }}
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
                    {this.state.error &&
                    <div className="row hang-error"><h4>{this.state.error}</h4></div>}
                  </form>
                    </>
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

//todo socket.io