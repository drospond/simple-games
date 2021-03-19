import React from 'react';

const HangLetter = ({letter, letterClass, isLetter}) => {
    return (
        <div className="hang-letter">
          <div className={letterClass}>{letter}</div>
          {isLetter && <div className="hang-piece letter-line"></div>}
        </div>
    );
};

export default HangLetter;