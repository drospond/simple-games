import React from 'react';

const TicTacToeBoard = ({board, playerMove}) => {
    return (
        <div id="tic-tac-toe-board">
            <div id="win-line" className="win-line"></div>
            {board.map((row, rowIndex) => {
              return row.map((tile, colIndex) => {
                return (
                  <div
                    className={`tic-tac-toe-square row${rowIndex} col${colIndex}`}
                    row={`${rowIndex}`}
                    col={`${colIndex}`}
                    key={`${rowIndex}-${colIndex}`}
                    onClick={(event) => playerMove(event)}
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
    );
};

export default TicTacToeBoard;