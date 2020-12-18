import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../Redux/actions";

const Navbar = () => {
  const isSignedIn = useSelector((state) => state.signInState.isSignedIn);
  const user = useSelector((state) => state.signInState.user);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-dark justify-content-between">
      <Link className="navbar-brand" to="/">
        Simple Games
      </Link>
      <ul className="navbar-nav ml-auto">
        {user && isSignedIn && <li id="nav-username" className="nav-item nav-link">{user.userObject.userName}</li>}
        {!isSignedIn ? (
          <li className="nav-item">
            <Link to="/signin" className="nav-link">
              Sign in
            </Link>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" onClick={() => dispatch(signOut())}>
                Sign out
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
