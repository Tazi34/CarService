import * as React from "react";
import { Link } from "react-router-dom";
import { NavBarLink } from "./NavBarLink";
import { useHistory } from "react-router";
import { loginPage } from "../../../urlAPI";
import { logout } from "../../../redux/authentication/authenticationActions";

export function LoginLogoutLink(props) {
  const history = useHistory();
  return props.auth ? (
    <NavBarLink component={Link} to={logout}>
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
