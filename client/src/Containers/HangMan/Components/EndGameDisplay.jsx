import React from "react";

const EndGameDisplay = ({ win, loss, emitBoardResest }) => {
  return (
    <>
      {win && (
        <h2 className="hang-end-display">
          Saved from hanging!{" "}
          <span
            className="play-again-switch"
            onClick={() => {
              emitBoardResest();
            }}
          >
            Play Again?
          </span>
        </h2>
      )}
      {loss && (
        <h2 className="hang-end-display">
          The poor man has been hanged!{" "}
          <span
            className="play-again-switch"
            onClick={() => emitBoardResest()}
          >
            Play Again?
          </span>
        </h2>
      )}
    </>
  );
};

export default EndGameDisplay;
