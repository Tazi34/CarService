import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import { DatesCell } from "./DatesCell";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  rowContainer: {
    background: "#f4f4f4",
    padding: 10,
    borderRadius: 5
  },
  deleteButton: {
    color: "red"
  },
  canceledBooking: {
    backgroundColor: "rgba(0,0,0,0.15)"
  },
  currentBooking: {},
  pastBooking: {},
  incomingBooking: {}
});
const formatDate = dateString => {
  const month = moment(dateString)
    .format("MMM")
    .toString();
  const day = moment(dateString)
    .format("D")
    .toString();
  const year = moment(dateString)
    .format("Y")
    .toString();
  return { month, day, year };
};

export const ReservationRow = props => {
  const classes = useStyles();
  const { reservation } = props;
  const { car } = reservation;
  const { startDate, endDate } = props.reservation;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const isCanceled = reservation.canceled;

  const rowClassName = clsx(
    classes.rowContainer,
    isCanceled ? classes.canceledBooking : null
  );

  const renderCancelButton = () => {
    return isMobile ? (
      <Grid item xs={12}>
        <Button
          variant={"contained"}
          color={"primary"}
          fullWidth={true}
          onClick={() => props.cancelReservation(reservation)}
        >
          Cancel
        </Button>
      </Grid>
    ) : (
      <Grid item xs={1}>
        <IconButton onClick={() => props.cancelReservation(reservation)}>
          <ClearIcon className={classes.deleteButton} />
        </IconButton>
      </Grid>
    );
  };

  return (
    <Grid
      container
      className={rowClassName}
      direction={isMobile ? "column" : "row"}
      alignItems={isMobile ? "stretch" : "center"}
      spacing={2}
    >
      <Grid item xs={12} sm={3}>
        <DatesCell
          startDate={formatDate(startDate)}
          endDate={formatDate(endDate)}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography align={"center"}>{reservation.startSpot.name}</Typography>
        <ArrowRightAltIcon style={{ margin: "auto", display: "block" }} />
        <Typography align={"center"}>{reservation.endSpot.name}</Typography>
      </Grid>

      {!isMobile && (
        <>
          <Grid item sm={3}>
            <Typography align={"center"}>
              {car.model} {car.make}
            </Typography>
          </Grid>
        </>
      )}
      <Grid item xs={12} sm={2}>
        <Typography align={isMobile ? "center" : "right"}>
          {reservation.priceTotal} PLN
        </Typography>
      </Grid>
      {reservation.isCancelable && renderCancelButton()}

      {isCanceled && (
        <Grid item xs={12}>
          <Typography align={"center"} color={"primary"}>
            Booking canceled
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
