import React, { Component } from "react";
import "./Dashboard.scss";
import { connect } from "react-redux";
import axios from "axios";

function mapStateToProps(state) {
  const { signInState } = state;
  return { signInState: signInState };
}

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <div className="row title-row">
          <h1 className="title">
            {this.props.signInState.user.userObject.userName} Dashboard
          </h1>
        </div>
        <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th>Game</th>
                  <th>Wins</th>
                  <th>Losses</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.props.signInState.user.userObject.games).map(game=>{
                  return (
                    <tr>
                      <td>{this.props.signInState.user.userObject.games[game].title}</td>
                      <td>{this.props.signInState.user.userObject.games[game].wins}</td>
                      <td>{this.props.signInState.user.userObject.games[game].losses}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);
