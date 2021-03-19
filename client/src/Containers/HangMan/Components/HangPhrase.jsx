import React from "react";
import HangLetter from "./HangLetter";

const HangPhrase = ({ word, guesses }) => {
  let singleWord = [];
  const hangPhrase = [];
  word.forEach((letter, index) => {
    let letterClass = "";
    if (/[ ]/.test(letter)) {
      letterClass = "hidden";
      return hangPhrase.push(
        <HangLetter letterClass={letterClass} letter={"___"} isLetter={false}/>
      );
    }
    if (/[A-Z]/.test(letter) && !guesses.includes(letter)) {
      letterClass = "hidden";
    }
    if (/['\-,]/.test(letter)) {
      singleWord.push(
        <HangLetter letterClass={letterClass} letter={letter} isLetter={false}/>
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
        <HangLetter letterClass={letterClass} letter={letter} isLetter={true}/>
      );
      hangPhrase.push(<div className="hang-word">{singleWord}</div>);
      singleWord = [];
    } else {
      singleWord.push(
        <HangLetter letterClass={letterClass} letter={letter} isLetter={true}/>
      );
    }
  });

  return <div>{hangPhrase}</div>;
};

export default HangPhrase;
