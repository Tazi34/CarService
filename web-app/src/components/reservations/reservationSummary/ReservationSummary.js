// @flow
import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import { LocationSummary } from "./LocationSummary";
import Typography from "@material-ui/core/Typography";
import { PriceSummary } from "./PriceSummary";
import { CarSummary } from "../../carSummary/CarSummary";
import { grey } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import { ReturnButton } from "../../UI/ReturnButton";
import { RedirectButton } from "../../UI/RedirectButton";
import { detailsPage } from "../../../utilities/urls/pages";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    margin: "50px auto 0",
    maxWidth: "1200px",
    padding: 10
  },
  grid: {
    padding: 0
  },
  gridItem: {
    margin: 0,
    padding: 0,
    width: "100%"
  },
  button: {
    minWidth: "150px",
    margin: 10
  },
  backButton: {
    color: "white",
    backgroundColor: grey.A400
  }
});
const mockcar = {
  id: 99,
  doors: 5,
  model: "E-Series",
  make: "Ford",
  seats: 5,
  year: 1990,
  licence: "WV 996580",
  spot: {
    id: 14,
    name: "GAJOWA"
  },
  price: 120.0,
  active: true
};
export default function ReservationSummary(props) {
  const classes = useStyles();
  const {
    car,
    totalPrice,
    startDate,
    endDate,
    startSpot,
    endSpot,
    startCity,
    endCity
  } = props.reservation;

  const startLocation = { spot: startSpot.name, city: startCity.item.name };
  const endLocation = { spot: endSpot.name, city: endCity.item.name };

  const endMoment = moment(endDate);
  const days = endMoment.diff(startDate, "days");

  return (
    <Box bgcolor={"background.default"} className={classes.root}>
      <Grid
        className={classes.grid}
        container
        direction={"column"}
        justify="center"
        alignItems={"center"}
        spacing={1}
      >
        <Typography variant={"h4"} align={"center"}>
          YOUR RESERVATION
        </Typography>

        <Grid item className={classes.gridItem}>
          <Typography variant={"h6"} align={"center"}>
            CAR DETAILS
          </Typography>
          <CarSummary car={car.item} />
        </Grid>

        <Grid item className={classes.gridItem}>
          <Typography variant={"h6"} align={"center"}>
            DATE AND LOCATION
          </Typography>
          <LocationSummary
            location={startLocation}
            date={startDate}
            title={"START DATE"}
          />
        </Grid>
        <Grid item className={classes.gridItem}>
          <LocationSummary
            location={endLocation}
            date={endDate}
            title={"END DATE"}
          />
        </Grid>

        <Grid item className={classes.gridItem}>
          <Typography variant={"h6"} align={"center"}>
            SUMMARY
          </Typography>
          <PriceSummary price={totalPrice.price} days={days} />
        </Grid>

        <Grid
          item
          container
          justify={"center"}
          direction={"row"}
          className={classes.gridItem}
        >
          <Grid item>
            <RedirectButton
              fullWidth
              className={classes.button}
              variant={"contained"}
              color={"primary"}
              to={detailsPage}
            >
              Confirm
            </RedirectButton>
          </Grid>
          <Grid item>
            <ReturnButton
              fullWidth
              variant={"contained"}
              color={"secondary"}
              className={`${classes.button} ${classes.backButton}`}
            >
              Back
            </ReturnButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
