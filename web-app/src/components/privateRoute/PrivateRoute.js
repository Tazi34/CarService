import { Route } from "react-router-dom";
import { Redirect } from "react-router";
import React from "react";

export default function PrivateRoute({ component: Component, auth, ...rest }) {
  if (!auth) {
    return (
      <Route
        {...rest}
        render={props => (
          <Redirect
            to={{
              pathName: "/login",
              state: { from: props.location }
            }}
          />
        )}
      />
    );
  } else {
    return <Route {...rest} component={Component} />;
  }
}
