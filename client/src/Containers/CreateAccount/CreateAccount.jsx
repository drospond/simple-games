import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { signIn, storeUser } from "../../Redux/actions";
import { connect } from "react-redux";

class CreateAccount extends Component {
  state = {
    userName: "",
    password: "",
    passwordRepeat: "",
    error: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  getUserObject = () => {
    if (!sessionStorage.getItem("jwt")) return;
    const user = sessionStorage.getItem("jwt");
    axios
      .get("/api/users", { headers: { authorization: `Bearer ${user}` } })
      .then((res) => {
        const user = {
          _id: res.data._id,
          userName: res.data.userName,
        };
        this.props.storeUser(user);
      });
  };

  handleSignIn = (userName, password) => {
    axios.post("/api/users/signin", { userName, password }).then((res) => {
      console.log(res);
      if (res.data.errors) {
        console.log(res.data);
        return this.setState({ error: res.data.errors });
      }
      sessionStorage.setItem("jwt", res.data.accessToken);
      this.getUserObject();
      console.log("props: ", this.props);
      this.props.signIn();
      this.props.history.push("/");
    });
  };

  handleSubmit = (event, userName, password) => {
    event.preventDefault();
    if (this.state.password !== this.state.passwordRepeat) {
      return this.setState({ error: "Passwords do not match" });
    }
    axios
      .post("/api/users", { userName, password })
      .then((res) => {
        if (res.data.errors) {
          return this.setState({ error: res.data.errors });
        }
        this.handleSignIn(userName, password);
      })
      .catch((er) => console.log(er));
  };

  render() {
    return (
      <div className="container" id="signin-container">
        <div className="row title-row">
          <h1 className="title">Create Account</h1>
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
          <div className="form-group">
            <label htmlFor="passwordInputRepeat">Repeat Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordInputRepeat"
              placeholder="Repeat Password"
              name="passwordRepeat"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn">
            Create Account
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/signin" className="link">
            Sign in
          </Link>
        </p>
      </div>
    );
  }
}

export default connect(null, { signIn, storeUser })(CreateAccount);
