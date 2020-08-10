import React from "react";
import './Navbar.scss';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {signOut} from "../../Redux/actions";


const Navbar = () => {
  const isSignedIn = useSelector(state => state.signInState.isSignedIn);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-dark justify-content-between">
      <a className="navbar-brand" href="/">
        Simple Games
      </a>
      <ul className="navbar-nav ml-auto">
        {!isSignedIn ? (<li className="nav-item">
          <Link to="/signin" className="nav-link">
            Sign in
          </Link>
        </li>):
        (<li className="nav-item">
        <p className="nav-link" onClick={() => dispatch(signOut())}>
          Sign out
        </p>
      </li>)
        }
      </ul>
    </nav>
  );
};

export default Navbar;
