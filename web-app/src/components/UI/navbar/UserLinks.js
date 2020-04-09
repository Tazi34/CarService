import * as React from "react";

import { NavBarLink } from "./NavBarLink";
import { reservationsEndpoint } from "../../../utilities/urls/apiURL";

export function UserLinks() {
  return <NavBarLink to={reservationsEndpoint}>RESERVATIONS</NavBarLink>;
}
