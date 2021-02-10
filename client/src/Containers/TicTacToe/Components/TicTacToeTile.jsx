import React from "react";

const TicTacToeTile = ({ tile, rowIndex, colIndex, playerMove }) => {
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
};

export default TicTacToeTile;
