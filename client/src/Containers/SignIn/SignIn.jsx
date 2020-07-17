import React, { Component } from "react";
import "./SignIn.scss";

class SignIn extends Component {
  render() {
    return (
      <div className="container">
        <div className="row title-row">
          <h1 className="title">Sign In</h1>
        </div>
        <form id="signin-form" onSubmit={(event)=>{event.preventDefault();}}>
          <div className="form-group">
            <label for="userNameInput">Username</label>
            <input
              type="text"
              className="form-control"
              id="userNameInput"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label for="passwordInput">Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

export default SignIn;
