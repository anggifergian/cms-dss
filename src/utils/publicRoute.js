import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route {...rest} render={props => (
    !isLoggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/dashboard',
        state: { from: props.location }
      }}
      />
    )
  )} />
);

export default PublicRoute;