import React, { Component } from "react";
import "./Dashboard.scss";
import { connect } from "react-redux";
import axios from "axios";

function mapStateToProps(state) {
  const { signInState } = state;
  return { signInState: signInState };
}

class Dashboard extends Component {
  state = {
    user: false,
    error: false
  }

  componentDidMount(){
    if (!sessionStorage.getItem("jwt")) return this.setState({error: true});
    const userToken = sessionStorage.getItem("jwt");
    axios
      .get("/api/users", { headers: { authorization: `Bearer ${userToken}` } })
      .then((res) => {
        const user = res.data;
        this.setState({
          user: user
        })
      });
  }

  getAccountAge(){
    const currentDate = new Date();
    const createdDate = new Date(this.state.user.dateCreated);
    const accountAge = currentDate - createdDate;
    return Math.ceil(accountAge / (1000 * 60 * 60 * 24));
  }

  render() {
    return (
      <div className="container">
        <div className="row title-row">
          <h1 className="title">
            {this.state.user && this.state.user.userName} Dashboard
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
                {this.state.user && Object.keys(this.props.signInState.user.userObject.games).map(game=>{
                  return (
                    <tr>
                      <td>{this.state.user.games[game].title}</td>
                      <td>{this.state.user.games[game].wins}</td>
                      <td>{this.state.user.games[game].losses}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <h4 className="dashboard-data">Total Games: {this.state.user && this.state.user.totalGames}</h4>
          <h4 className="dashboard-data">{`Account Age: ${this.getAccountAge()} days`}</h4>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);
