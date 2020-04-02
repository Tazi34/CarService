import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ReservationRow } from "./ReservationRow";
import Typography from "@material-ui/core/Typography";
import { ReservationListHeader } from "./ReservationListHeader";
import { EmptyReservationsAlert } from "./EmptyReservationsAlert";

const useStyles = makeStyles({
  root: {
    marginTop: 50
  },
  row: {
    padding: "10px 30px 30px 20px"
  },
  header: {
    padding: 20
  },
  container: {
    maxWidth: 1000,
    margin: "auto"
  }
});

export const ReservationsTable = props => {
  const classes = useStyles();
  const reservations = props.reservations;

  if (reservations.length == 0) {
    return <EmptyReservationsAlert />;
  }

  return (
    <List className={classes.root}>
      <div className={classes.container}>
        <ReservationListHeader />
        {reservations.map(reservation => (
          <ListItem key={reservation.id} className={classes.row}>
            <ReservationRow reservation={reservation} />
          </ListItem>
        ))}
      </div>
    </List>
  );
};
