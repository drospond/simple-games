import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'

const PrivateRoute = ({component: Component, ...rest}) => {
    const isSignedIn = useSelector(state => state.signInState.isSignedIn)
    return (
        <Route {...rest} render={props => 
            (
            isSignedIn ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;