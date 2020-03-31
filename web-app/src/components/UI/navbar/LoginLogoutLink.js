import * as React from "react";
import { Link } from "react-router-dom";
import { NavBarLink } from "./NavBarLink";
import { useHistory } from "react-router";
import { loginPage, logoutPage } from "../../../utilities/urls/pages";

export function LoginLogoutLink(props) {
  const history = useHistory();
  return props.auth ? (
    <NavBarLink component={Link} to={logoutPage}>
      LOGOUT
    </NavBarLink>
  ) : (
    <NavBarLink
      component={Link}
      to={{
        pathname: loginPage,
        state: { from: history.location.pathname }
      }}
    >
      LOGIN
    </NavBarLink>
  );
}
