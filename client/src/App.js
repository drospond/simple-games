import React from "react";
import "./App.css";
import Home from "./Containers/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import SignIn from "./Containers/SignIn/SignIn";
import CreateAccount from "./Containers/CreateAccount/CreateAccount";
import {
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import TicTacToe from "./Containers/TicTacToe/TicTacToe";
import HangMan from "./Containers/HangMan/HangMan";
import Dashboard from "./Containers/Dashboard/Dashboard";

function App() {
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
        <Route
          exact
          path="/Dashboard"
          render={(props) => <Dashboard {...props} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
