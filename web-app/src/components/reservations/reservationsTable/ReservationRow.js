import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import { DatesCell } from "./DatesCell";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const useStyles = makeStyles({
  rowContainer: {
    background: "#f4f4f4",
    padding: 10
  }
});
const formatDate = dateString => {
  const month = moment(dateString)
    .format("MMM")
    .toString();
  const day = moment(dateString)
    .format("D")
    .toString();
  return { month, day };
};

export const ReservationRow = props => {
  const classes = useStyles();
  const { reservation } = props;
  const { car } = reservation;
  return (
    <Grid
      container
      className={classes.rowContainer}
      alignItems={"center"}
      spacing={2}
    >
      <Grid item xs={3}>
        <DatesCell
          startDate={formatDate(reservation.startDate)}
          endDate={formatDate(reservation.endDate)}
        />
      </Grid>
      <Grid item xs={3}>
        <Typography align={"center"}>{reservation.startSpot.name}</Typography>
        <ArrowRightAltIcon style={{ margin: "auto", display: "block" }} />
        <Typography align={"center"}>{reservation.endSpot.name}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align={"center"}>
          {car.model} {car.make}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align={"right"}>{reservation.priceTotal} PLN</Typography>
      </Grid>
    </Grid>
  );
};
