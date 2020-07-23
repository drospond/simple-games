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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
