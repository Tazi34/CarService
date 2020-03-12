// @flow
import * as React from "react";
import { Link } from "react-router-dom";
import { NavBarLink } from "./NavBarLink";

export function LoginLogoutLink(props) {
  return props.auth ? (
    <NavBarLink component={Link} to={"/logout"}>
      Logout
    </NavBarLink>
  ) : (
    <NavBarLink component={Link} to={"/login"}>
      Login
    </NavBarLink>
  );
}
