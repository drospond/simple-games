import React from "react";
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark justify-content-between">
      <a className="navbar-brand" href="/">
        Simple Games
      </a>
      <ul class="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="/">
            Sign in
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
