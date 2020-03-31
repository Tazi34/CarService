import { Route } from "react-router-dom";
import { Redirect } from "react-router";
import React from "react";
import { loginPage } from "../../utilities/urls/pages";

export default function AuthorizedPrivateRoute({
  component: Component,
  user,
  roles,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => {
        //not logged
        if (!user) {
          return (
            <Redirect
              to={{
                pathname: loginPage,
                state: { from: props.location.pathname }
              }}
            />
          );
        }
        if (roles) {
          const userRoles = user.roles.map(role => role.name);
          const isInRoles = userRoles.some(role => roles.includes(role));
          //logged but not authorized
          if (!isInRoles) {
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: props.location }
                }}
              />
            );
          }
        }
        //authorized
        return <Component {...props} />;
      }}
    />
  );
}
