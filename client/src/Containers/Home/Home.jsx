import React, { Component } from "react";
import "./Home.scss";
import GameCard from "../../Components/GameCard/GameCard";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row title-row">
          <h1 className="title">Simple Games</h1>
        </div>
        <div className="row card-row">
          <GameCard />
        </div>
      </div>
    );
  }
}

export default Home;
