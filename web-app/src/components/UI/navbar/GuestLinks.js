import * as React from "react";
import { NavBarLink } from "./NavBarLink";

export function GuestLinks() {
  return (
    <>
      <NavBarLink to={"/contact"} style={{ color: "white" }}>
        CONTACT
      </NavBarLink>
      <NavBarLink to={"/about"} style={{ color: "white" }}>
        ABOUT
      </NavBarLink>
    </>
  );
}
