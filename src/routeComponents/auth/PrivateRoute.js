import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.user._id) {
          return <Component {...props} {...rest} user={user.user} />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}

export default PrivateRoute;
