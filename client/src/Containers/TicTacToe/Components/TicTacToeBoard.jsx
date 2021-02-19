import React from 'react';
import TicTacToeTile from './TicTacToeTile';

const TicTacToeBoard = ({board, playerMove}) => {
    return (
        <div id="tic-tac-toe-board">
            <div id="win-line" className="win-line"></div>
            {board.map((row, rowIndex) => {
              return row.map((tile, colIndex) => {
                return (
                  <TicTacToeTile key={rowIndex+colIndex} tile={tile} rowIndex={rowIndex} colIndex={colIndex} playerMove={playerMove}/>
                );
              });
            })}
          </div>
    );
};

export default TicTacToeBoard;