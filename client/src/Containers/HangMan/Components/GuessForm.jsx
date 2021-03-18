import React, { useState } from "react";
import socket from "../../../socket.io";
import { useSelector } from "react-redux";

const GuessForm = ({ guesses }) => {
  const room = useSelector((state) => state.roomCode);
  const playerNumber = useSelector((state) => state.playerNumber);
  const [letterGuess, setLetterGuess] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!guessError()) {
      socket.emit("guess letter", {
        player: playerNumber,
        letter: letterGuess,
        room: room,
      });
    }
    setLetterGuess("");
  };

  const handleChangeLetter = (event) => {
    setLetterGuess(event.target.value.toUpperCase());
    setError(false);
  };

  const guessError = () => {
    if (!/[a-zA-Z]{1}/.test(letterGuess)) {
      setLetterGuess("");
      setError("Must guess a letter!");
      return true;
    }
    if (guesses.includes(letterGuess)) {
      setLetterGuess("");
      setError("Letter already guessed!");
      return true;
    }
    return false;
  };

  return (
    <>
      <form
        id="guess-form"
        //TODO: play around with removing arrow function
        onSubmit={(event) => handleSubmit(event)}
      >
        <h4 className="hang-man-question">Guess a Letter</h4>
        <input
          type="text"
          className="form-control"
          id="hangManLetterInput"
          value={letterGuess}
          maxLength="1"
          autoComplete="off"
          onChange={(event) => handleChangeLetter(event)}
        />
        <button type="submit" id="submit-letter" className="btn btn-primary">
          Guess
        </button>
        {error && (
          <div className="row hang-error">
            <h4>{error}</h4>
          </div>
        )}
      </form>
    </>
  );
};

export default GuessForm;
