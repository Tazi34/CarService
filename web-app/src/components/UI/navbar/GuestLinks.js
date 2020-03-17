// @flow
import * as React from "react";
import { Link } from "react-router-dom";
import { NavBarLink } from "./NavBarLink";

export function GuestLinks(props) {
  return (
    <>
      <NavBarLink component={Link} to={"/contact"} style={{ color: "white" }}>
        Contact
      </NavBarLink>
      <NavBarLink component={Link} to={"/about"} style={{ color: "white" }}>
        About
      </NavBarLink>
    </>
  );
}
