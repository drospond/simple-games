import React, { Component } from "react";
import "./SignIn.scss";
import axios from "axios";
import {signIn, storeUser} from '../../Redux/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SignIn extends Component {
  state = {
    userName: "",
    password: "",
    error: false
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: false
    });
  };

  handleSignIn = () => {
    this.props.signIn();
  }

  getUserObject = () => {
    if (!sessionStorage.getItem("jwt")) return;
    const user = sessionStorage.getItem("jwt");
    axios
      .get("/api/users", { headers: { authorization: `Bearer ${user}` } })
      .then((res) => {
        const user = res.data;
        this.props.storeUser(user);
      });
  };

  handleSubmit = (event, userName, password) => {
    event.preventDefault();
    axios
      .post("/api/users/signin", { userName, password })
      .then((res) => {
        if (res.data.errors) {
          return this.setState({ error: res.data.errors });
        }
        sessionStorage.setItem("jwt", res.data.accessToken);
        this.getUserObject();
        this.handleSignIn();
        this.props.history.push("/");
      });
  };

  render() {
    return (
      <div className="container" id="signin-container">
        <div className="row title-row">
          <h1 className="title">Sign In</h1>
        </div>
        <p className="error">{this.state.error}</p>
        <form
          id="signin-form"
          onSubmit={(event) => {
            this.handleSubmit(event, this.state.userName, this.state.password);
          }}
        >
          <div className="form-group">
            <label htmlFor="userNameInput">Username</label>
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
            <label htmlFor="passwordInput">Password</label>
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
        <p>Still need an account? <Link to="/createAccount" className="link">Sign up</Link></p>
      </div>
    );
  }
}

export default connect(
  null,
  { signIn, storeUser }
)(SignIn);
