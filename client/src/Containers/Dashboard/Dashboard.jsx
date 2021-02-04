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
      </div>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);
