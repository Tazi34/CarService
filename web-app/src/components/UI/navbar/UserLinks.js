// @flow
import * as React from "react";
import { Link } from "react-router-dom";
import { NavBarLink } from "./NavBarLink";
import { reservationsEndpoint } from "../../../urlAPI";

export function UserLinks(props) {
  return (
    <>
      <NavBarLink
        component={Link}
        to={reservationsEndpoint}
        style={{ color: "white" }}
      >
        Reservations
      </NavBarLink>
    </>
  );
}
