import * as React from "react";
import { NavBarLink } from "./NavBarLink";
import { useHistory } from "react-router";
import { loginPage, logoutPage } from "../../../utilities/urls/pages";

export function LoginLogoutLink({ auth, ...props }) {
  const history = useHistory();
  return auth ? (
    <NavBarLink to={logoutPage} {...props}>
      LOGOUT
    </NavBarLink>
  ) : (
    <NavBarLink
      {...props}
      to={{
        pathname: loginPage,
        state: { from: history.location.pathname }
      }}
    >
      LOGIN
    </NavBarLink>
  );
}
