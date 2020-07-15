import React from "react";
import './Navbar.scss';
import {useSelector, useDispatch} from 'react-redux';
import {signIn, signOut} from '../../Redux/actions';

const Navbar = () => {
const isSignedIn = useSelector(state => state.isSignedIn);
const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-dark justify-content-between">
      <a className="navbar-brand" href="/">
        Simple Games
      </a>
      <ul className="navbar-nav ml-auto">
        {!isSignedIn ? (<li className="nav-item">
          <a className="nav-link" onClick={() => dispatch(signIn())}>
            Sign in
          </a>
        </li>):
        (<li className="nav-item">
        <a className="nav-link" onClick={() => dispatch(signOut())}>
          Sign out
        </a>
      </li>)
        }
      </ul>
    </nav>
  );
};

export default Navbar;
