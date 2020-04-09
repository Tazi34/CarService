import { Route } from "react-router-dom";
import { Redirect } from "react-router";
import React from "react";
import { loginPage } from "../../utilities/urls/pages";

export default function AuthorizedPrivateRoute({
  component: Component,
  user,
  roles,
  ...props
}) {
  return (
    <Route
      {...props}
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
                {...props}
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
