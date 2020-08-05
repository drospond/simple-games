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
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    playerTurn: 1,
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
      if (data.player === "1") {
        this.setState({ playerTurn: 2 });
      } else {
        this.setState({ playerTurn: 1 });
      }
    });
  }
  //Leave room on unmount

  playerMove(event) {
    if (Number(this.props.playerNumber) === this.state.playerTurn) {
      const col = event.target.getAttribute("col");
      const row = event.target.getAttribute("row");
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
          <div id="tic-tac-toe-board">
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
                    {/* {tile} */}
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
