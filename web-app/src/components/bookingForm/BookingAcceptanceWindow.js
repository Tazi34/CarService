// @flow
import * as React from "react";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";

export function BookingAcceptanceWindow(props) {
  const history = useHistory();
  return (
    <div>
      CZY JESTES PEWNY :D
      <Button onClick={() => history.push("/details")}>Wprowadz dane</Button>
      <Button onClick={() => history.goBack()}>jednak nie</Button>
    </div>
  );
}
