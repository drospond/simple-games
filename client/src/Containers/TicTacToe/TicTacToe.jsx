import React, { Component } from "react";
import GameChat from "../../Components/GameChat/GameChat";
import {joinRoom} from '../../Redux/actions';
import { connect } from 'react-redux';
const socket = require("../../socket.io");

class TicTacToe extends Component {

  componentDidMount(){
      const room = sessionStorage.getItem('room');
      if(room){
        this.props.joinRoom(room);
        socket.default.emit('join', room);
      }
  }
  render() {
    return (
      <div className="container">
        <div className="row title-row">
          <h1 className="title">Tic-Tac-Toe</h1>
        </div>
        <div className="row">
          <GameChat/>
        </div>
      </div>
    );
  }
}

export default connect(
    null,
    { joinRoom }
  )(TicTacToe);
