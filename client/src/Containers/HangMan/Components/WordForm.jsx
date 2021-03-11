import React from "react";

const WordForm = ({error, letterGuess, handleChangeWord, handleSubmit}) => {
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} id="hang-man-form">
        <h4 className="hang-man-question">Choose a word or phrase</h4>
        <input
          type="text"
          className="form-control"
          id="hangManWordInput"
          name="word"
          autoComplete="off"
          onChange={handleChangeWord}
        />
        <button type="submit" id="submit-word" className="btn btn-primary">
          Submit
        </button>
      </form>
      {error && !letterGuess && (
        <div className="row hang-error">
          <h4>{error}</h4>
        </div>
      )}
    </>
  );
};

export default WordForm;
