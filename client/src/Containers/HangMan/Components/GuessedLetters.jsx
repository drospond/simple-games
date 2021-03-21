import React from "react";

const GuessedLetters = ({ guesses, word }) => {
  return (
    <>
      {guesses.map((letter) => {
        if (!word.includes(letter)) {
          return letter;
        }
        return "";
      })}
    </>
  );
};

export default GuessedLetters;
