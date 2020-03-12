// @flow
import * as React from "react";
import { Link } from "react-router-dom";
import { NavBarLink } from "./NavBarLink";

export function AdminNavLinks(props) {
  return (
    <>
      <NavBarLink component={Link} to={"/admin/cars"}>
        Cars
      </NavBarLink>
    </>
  );
}
