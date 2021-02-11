import React from "react";
import OMark from "./OMark";
import XMark from "./XMark";

const TicTacToeTile = ({ tile, rowIndex, colIndex, playerMove }) => {
  return (
    <div
      className={`tic-tac-toe-square row${rowIndex} col${colIndex}`}
      row={`${rowIndex}`}
      col={`${colIndex}`}
      key={`${rowIndex}-${colIndex}`}
      onClick={(event) => playerMove(event)}
    >
      {tile === "1" && <OMark/>}
      {tile === "2" && <XMark/>}
    </div>
  );
};

export default TicTacToeTile;
