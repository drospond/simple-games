import React, { Component } from "react";
import "./SignIn.scss";

class SignIn extends Component {

  state = {
    userName: "",
    password: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  }

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
              placeholder="Username"
              name="userName"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label for="passwordInput">Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
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
