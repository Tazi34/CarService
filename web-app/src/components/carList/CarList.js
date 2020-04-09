import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import CarCard from "../carCard/CarCard";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 10
  },
  gridItem: {
    padding: 0,
    margin: "auto"
  }
}));

export default function CarList({ cars, onCarSelect, ...props }) {
  const classes = useStyles();
  if (cars.length === 0)
    return (
      <Typography style={{ backgroundColor: "white", height: "400px" }}>
        EMPTY :C
      </Typography>
    );

  return (
    <Grid
      {...props}
      container
      spacing={3}
      justify="flex-start"
      alignContent={"center"}
      alignItems={"center"}
      className={classes.root}
    >
      {cars.map(car => (
        <Grid
          className={classes.gridItem}
          item
          key={car.id}
          xs={12}
          md={6}
          lg={4}
        >
          <CarCard car={car} onCarSelect={onCarSelect} />
        </Grid>
      ))}
    </Grid>
  );
}
