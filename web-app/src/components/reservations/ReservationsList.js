// @flow
import * as React from "react";
import List from "@material-ui/core/List";
import { ReservationListItem } from "./ReservationListItem";

export function ReservationsList(props) {
  return (
    <List>
      {props.reservations.map(res => (
        <ReservationListItem
          key={res.id}
          item={res}
          deleteReservation={props.deleteReservationHandler}
        ></ReservationListItem>
      ))}
    </List>
  );
}
