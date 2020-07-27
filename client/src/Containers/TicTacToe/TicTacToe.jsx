import React, { Component } from "react";
import GameChat from "../../Components/GameChat/GameChat";
import { joinRoom } from "../../Redux/actions";
import { connect } from "react-redux";
import socket from "../../socket.io";
import "./TicTacToe.scss";

function mapStateToProps(state) {
  const { roomCode } = state;
  return { roomCode: roomCode };
}

class TicTacToe extends Component {
  state = {
    board: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
  };

  componentDidMount() {
    console.log(this);
    const room = sessionStorage.getItem("room");
    if (room) {
      this.props.joinRoom(room);
      socket.emit("join", room);
    }
  }
  //Leave room on unmount

  playerMove(event){
    const col = event.target.getAttribute("col");
    const row = event.target.getAttribute('row');
    const updatedBoard = [...this.state.board];
    updatedBoard[row][col] = "move";
    this.setState({board: updatedBoard});
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
                    value={tile}
                    row={`${rowIndex}`}
                    col={`${colIndex}`}
                    key={`${rowIndex}-${colIndex}`}
                    onClick={(event)=> this.playerMove(event)}
                  >
                    {tile}
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

export default connect(mapStateToProps, { joinRoom })(TicTacToe);
