import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * This component will route to login page if user is not logged in. Otherwise, it will route to the user's homepage.
 */
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('access_token')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login' }} />
    )} />
    
)
