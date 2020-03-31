import React from "react";
import Grid from "@material-ui/core/Grid";
import sampleCar from "../../images/cars/carWhiteBackGround.jpg";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { CarDetailsTable } from "./CarDetailsTable";

const useStyles = makeStyles({
  image: {
    width: "100%",
    padding: 5
  }
});
export const CarSummary = props => {
  const classes = useStyles();
  const car = props.car;
  return (
    <Grid
      container
      direction={"row"}
      justify={"space-evenly"}
      alignItems={"center"}
    >
      <Grid item xs={12} sm={6}>
        <CarDetailsTable car={car} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <img
          alt={`${car.make} ${car.model}`}
          src={sampleCar}
          className={classes.image}
        ></img>
      </Grid>
    </Grid>
  );
};
