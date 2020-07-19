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
        const user = {
          _id: res.data._id,
          userName: res.data.userName
        };
        console.log("user: ", user);
        this.props.storeUser(user);
      });
  };

  handleSubmit = (event, userName, password) => {
    event.preventDefault();
    axios
      .post("/api/users/signin", { userName, password })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          console.log(res.data);
          return this.setState({ error: res.data.errors });
        }
        sessionStorage.setItem("jwt", res.data.accessToken);
        this.getUserObject();
        console.log('props: ', this.props);
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
        <p>Still need an account? <Link to="/createAcount" className="link">Sign up</Link></p>
      </div>
    );
  }
}

export default connect(
  null,
  { signIn, storeUser }
)(SignIn);
