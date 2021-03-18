import React from "react";

const HangWord = ({ word, guesses }) => {
  let singleWord = [];
  const hangPhrase = [];
  word.forEach((letter, index) => {
    let letterClass = "";
    if (/[ ]/.test(letter)) {
      letterClass = "hidden";
      return hangPhrase.push(
        <div className="hang-letter">
          <div className={letterClass}>{"___"}</div>
        </div>
      );
    }
    if (/[A-Z]/.test(letter) && !guesses.includes(letter)) {
      letterClass = "hidden";
    }
    if (/['\-,]/.test(letter)) {
      singleWord.push(
        <div className="hang-letter">
          <div className={letterClass}>{letter}</div>
        </div>
      );
      if (/[,]/.test(letter)) {
        hangPhrase.push(<div className="hang-word">{singleWord}</div>);
        singleWord = [];
        return;
      }
      return;
    }
    if (
      index === word.length - 1 ||
      word[index + 1] === " "
    ) {
      singleWord.push(
        <div className="hang-letter">
          <div className={letterClass}>{letter}</div>
          <div className="hang-piece letter-line"></div>
        </div>
      );
      hangPhrase.push(<div className="hang-word">{singleWord}</div>);
      singleWord = [];
    } else {
      singleWord.push(
        <div className="hang-letter">
          <div className={letterClass}>{letter}</div>
          <div className="hang-piece letter-line"></div>
        </div>
      );
    }
  });

  return <div>{hangPhrase}</div>;
};

export default HangWord;
