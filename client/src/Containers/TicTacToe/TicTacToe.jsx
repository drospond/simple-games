import React, { Component } from "react";
import GameChat from "../../Components/GameChat/GameChat";
import { joinRoom, assignPlayerumber } from "../../Redux/actions";
import { connect } from "react-redux";
import socket from "../../socket.io";
import "./TicTacToe.scss";

function mapStateToProps(state) {
  const { roomCode, playerNumber } = state;
  return { roomCode: roomCode, playerNumber: playerNumber };
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
      this.setState({ board: data.board });
      this.checkWinner(data.player);
      if (data.player === "1") {
        this.setState({ playerTurn: 2 });
      } else {
        this.setState({ playerTurn: 1 });
      }
    });
  }
  //Leave room on unmount

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
      diag1.push(board[i][board.length - i]);
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
    if (winCondition) {
      this.setState({ winner: player });
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

  render() {
    return (
      <div className="container">
        <div className="row title-row">
          <h1 className="title">Tic-Tac-Toe</h1>
        </div>
        <div className="row">
          <h4 id="room-code">Room: {this.props.roomCode}</h4>
        </div>
        {this.state.winner && (
          <div className="row">
            <h4 id="winner-notification">Player {this.state.winner} wins!</h4>
          </div>
        )}
        <div className="row">
          <GameChat socket={socket} />
          <div id="tic-tac-toe-board">
            <div className="win-line"></div>
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
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { joinRoom, assignPlayerumber })(
  TicTacToe
);

//TODO: fix bugs with player leaving room after another joins. try storing playerNumber in session storage
