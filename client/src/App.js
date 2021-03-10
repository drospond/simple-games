import React from "react";
import "./App.css";
import Home from "./Containers/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import SignIn from "./Containers/SignIn/SignIn";
import CreateAccount from "./Containers/CreateAccount/CreateAccount";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import TicTacToe from "./Containers/TicTacToe/TicTacToe";
import HangMan from "./Containers/HangMan/HangMan";
import Dashboard from "./Containers/Dashboard/Dashboard";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import { useDispatch } from "react-redux";
import socket from "./socket.io";

function App() {
  const dispatch = useDispatch();
  socket.initializeListeners(dispatch);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signin" render={(props) => <SignIn {...props} />} />
        <Route
          exact
          path="/createAccount"
          render={(props) => <CreateAccount {...props} />}
        />
        <Route
          exact
          path="/TicTacToe"
          render={(props) => <TicTacToe {...props} />}
        />
        <Route
          exact
          path="/HangMan"
          render={(props) => <HangMan {...props} />}
        />
        <PrivateRoute exact path="/Dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
