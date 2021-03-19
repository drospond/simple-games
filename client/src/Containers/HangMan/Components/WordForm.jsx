import React, { useState } from "react";
import { useSelector } from "react-redux";
import socket from "../../../socket.io";

const WordForm = () => {
  const [error, setError] = useState(false);
  const [word, setWord] = useState([]);
  const player = useSelector((state) => state.playerNumber);
  const room = useSelector((state) => state.roomCode);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (/^([A-Z][,'-]? ?){4,64}$/.test(word)) {
      socket.emit("set word", {
        player,
        word: word.split(""),
        room,
      });
      setWord([]);
    } else {
      setError(
        "Invalid entry. Word/phrase can't contain special characters other than a comma, appostrophe, or dash and must be less that 64 characters."
      );
    }
  };

  const handleChangeWord = (event) => {
    setWord(event.target.value.toUpperCase());
    setError(false);
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} id="hang-man-form">
        <h4 className="hang-man-question">Choose a word or phrase</h4>
        <input
          type="text"
          className="form-control"
          id="hangManWordInput"
          autoComplete="off"
          value={word}
          onChange={handleChangeWord}
        />
        <button type="submit" id="submit-word" className="btn btn-primary">
          Submit
        </button>
      </form>
      {error && (
        <div className="row hang-error">
          <h4>{error}</h4>
        </div>
      )}
    </>
  );
};

export default WordForm;
