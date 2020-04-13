import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ReservationRow } from "./ReservationRow";
import { ReservationListHeader } from "./ReservationListHeader";
import { EmptyReservationsAlert } from "./EmptyReservationsAlert";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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

export const ReservationsTable = ({
  reservations,
  cancelReservation,
  ...props
}) => {
  const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  if (reservations.length === 0) {
    return <EmptyReservationsAlert />;
  }

  return (
    <List className={classes.root} {...props}>
      <div className={classes.container}>
        {!isMobile && <ReservationListHeader />}
        {reservations.map(reservation => (
          <ListItem key={reservation.id} className={classes.row}>
            <ReservationRow
              reservation={reservation}
              cancelReservation={cancelReservation}
            />
          </ListItem>
        ))}
      </div>
    </List>
  );
};
