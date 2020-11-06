import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute1 = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !localStorage.resetToken  ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute1;
