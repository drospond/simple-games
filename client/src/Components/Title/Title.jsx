import React from "react";
import { useSelector } from "react-redux";

const Title = ({ title }) => {
  const room = useSelector((state) => state.roomCode);

  return (
    <>
      <div className="row title-row">
        <h1 className="title">{title}</h1>
      </div>
      <div className="row">
        <h4 id="room-code">Room: {room}</h4>
      </div>
    </>
  );
};

export default Title;
