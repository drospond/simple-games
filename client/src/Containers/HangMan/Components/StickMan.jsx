import React from "react";

const StickMan = ({ wrongGuesses }) => {
  const hangManPieces = [
    <div className="hang-head"></div>,
    <div className="hang-piece hang-body"></div>,
    <div className="hang-piece hang-arm-l"></div>,
    <div className="hang-piece hang-arm-r"></div>,
    <div className="hang-piece hang-leg-l"></div>,
    <div className="hang-piece hang-leg-r"></div>,
  ];

  const renderedHangManPieces = [];
  for (let i = 0; i < wrongGuesses; i++) {
    renderedHangManPieces.push(hangManPieces[i]);
  }
  
  return (
    <div id="man-section">
      <div className="hang-piece hang-base"></div>
      <div className="hang-piece hang-staff"></div>
      <div className="hang-piece hang-reach"></div>
      <div className="hang-piece hang-rope"></div>
      {renderedHangManPieces}
    </div>
  );
};

export default StickMan;
