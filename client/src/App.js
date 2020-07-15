import React from "react";
import "./App.css";
import Home from "./Containers/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import SignIn from "./Containers/SignIn/SignIn";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
