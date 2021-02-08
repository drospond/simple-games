import React, { Component } from "react";
import GameChat from "../../Components/GameChat/GameChat";
import { joinRoom, assignPlayerumber } from "../../Redux/actions";
import { connect } from "react-redux";
import socket from "../../socket.io";
import "./TicTacToe.scss";
import Axios from "axios";

function mapStateToProps(state) {
  const { roomCode, playerNumber, signInState } = state;
  return { roomCode: roomCode, playerNumber: playerNumber, signInState: signInState };
}
class TicTacToe extends Component {
  state = {
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    playerTurn: 1,
    winner: false,
  };
  
  componentDidMount() {
    socket.emit('join', this.props.roomCode);
    
    const room = sessionStorage.getItem("room");
    const playerNumber = sessionStorage.getItem("playerNumber");
    if (playerNumber) {
      this.props.assignPlayerumber(playerNumber);
    }
    if (room) {
      this.props.joinRoom(room);
      socket.emit("join", room);
    }

    socket.on("board update", (data) => {
      console.log('board update: ', data);
      this.setState({ board: data.board });
      this.checkWinner(data.player);
      if (data.player === "1") {
        this.setState({ playerTurn: 2 });
      } else {
        this.setState({ playerTurn: 1 });
      }
    });

    socket.on("reset board", () => {
      this.setState({
        board: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        winner: false,
      });
      document.getElementById("win-line").className = "";
    });
  }
  //Leave room on unmount
  updateWins(){
    Axios.get(`/api/users/updateWins/tictactoe/${this.props.signInState.user.userObject._id}`);
  }
  updateLosses(){
    Axios.get(`/api/users/updateLosses/tictactoe/${this.props.signInState.user.userObject._id}`);
  }

  checkWinner(player) {
    const { board } = this.state;
    const col0 = board.map((row) => row[0]);
    const col1 = board.map((row) => row[1]);
    const col2 = board.map((row) => row[2]);
    let diag0 = [];
    for (let i = 0; i < board.length; i++) {
      diag0.push(board[i][i]);
    }
    let diag1 = [];
    for (let i = 0; i < board.length; i++) {
      diag1.push(board[i][board.length - 1 - i]);
    }
    const allEquals = (tile) => tile === player;
    let winCondition = false;
    if (board[0].every(allEquals)) {
      winCondition = 0;
    } else if (board[1].every(allEquals)) {
      winCondition = 1;
    } else if (board[2].every(allEquals)) {
      winCondition = 2;
    } else if (col0.every(allEquals)) {
      winCondition = 3;
    } else if (col1.every(allEquals)) {
      winCondition = 4;
    } else if (col2.every(allEquals)) {
      winCondition = 5;
    } else if (diag0.every(allEquals)) {
      winCondition = 6;
    } else if (diag1.every(allEquals)) {
      winCondition = 7;
    }
    if (winCondition !== false) {
      this.setState({ winner: player });
      this.drawWinLine(winCondition);
      if(this.props.signInState.user && player === this.props.playerNumber){
        this.updateWins();
      }else if(this.props.signInState.user && player !== this.props.playerNumber){
        this.updateLosses();
      }
    } else if (!this.state.board.some(row => row.includes(0))){
      this.setState({
        catsGame: true,
        winner: 3,
      })
    }
  }

  drawWinLine(winCondition) {
    const winLine = document.getElementById("win-line");
    winLine.classList.add("visible");
    switch (winCondition) {
      case 0:
        winLine.classList.add("win0");
        break;
      case 1:
        winLine.classList.add("win1");
        break;
      case 2:
        winLine.classList.add("win2");
        break;
      case 3:
        winLine.classList.add("win3");
        break;
      case 4:
        winLine.classList.add("win4");
        break;
      case 5:
        winLine.classList.add("win5");
        break;
      case 6:
        winLine.classList.add("win6");
        break;
      case 7:
        winLine.classList.add("win7");
        break;
    }
  }

  playerMove(event) {
    if (!this.state.winner) {
      const col = event.target.getAttribute("col");
      const row = event.target.getAttribute("row");
      if (
        Number(this.props.playerNumber) === this.state.playerTurn &&
        row !== null &&
        this.state.board[row][col] === 0
      ) {
        const updatedBoard = [...this.state.board];
        updatedBoard[row][col] = this.props.playerNumber;
        socket.emit("player move", {
          player: this.props.playerNumber,
          board: updatedBoard,
          room: this.props.roomCode
        });
        this.setState({ board: updatedBoard });
        if (this.state.playerTurn === 1) {
          this.setState({ playerTurn: 2 });
        } else {
          this.setState({ playerTurn: 1 });
        }
      }
    }
  }

  playAgain() {
    socket.emit("play again", { room: this.props.roomCode });
  }

  render() {
    return (
      <div className="container">
        <div className="row title-row">
          <h1 className="title">Tic-Tac-Toe</h1>
        </div>
        <div className="row">
          <h4 id="room-code">Room: {this.props.roomCode}</h4>
        </div>
        {Number(this.state.playerTurn) === Number(this.props.playerNumber) && !this.state.winner && (
          <div className="row">
            <h4 id="winner-notification">
              Your turn
            </h4>
          </div>
        )}
        {Number(this.state.playerTurn) !== Number(this.props.playerNumber) && !this.state.winner && (
          <div className="row">
            <h4 id="winner-notification">
              Their turn
            </h4>
          </div>
        )}
        {this.state.winner && (
          <div className="row">
            <h4 id="winner-notification">
              {this.state.winner !== 3 && <>Player {this.state.winner} wins!</>}
              {this.state.winner === 3 && <>Cat's Game!</>}
              <span id="play-again-switch" onClick={() => this.playAgain()}>
                {" "}
                Play again?
              </span>
            </h4>
          </div>
        )}
        <div className="row">
          <div id="tic-tac-toe-board">
            <div id="win-line" className="win-line"></div>
            {this.state.board.map((row, rowIndex) => {
              return row.map((tile, colIndex) => {
                return (
                  <div
                    className={`tic-tac-toe-square row${rowIndex} col${colIndex}`}
                    row={`${rowIndex}`}
                    col={`${colIndex}`}
                    key={`${rowIndex}-${colIndex}`}
                    onClick={(event) => this.playerMove(event)}
                  >
                    {tile === "1" && <div className="O-move"></div>}
                    {tile === "2" && (
                      <div className="X-move">
                        <div className="X-1"></div>
                        <div className="X-2"></div>
                      </div>
                    )}
                  </div>
                );
              });
            })}
          </div>
          <GameChat socket={socket} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { joinRoom, assignPlayerumber })(
  TicTacToe
);
