import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
//TODO EMPTY LIST INFO
import CarCard from "../carCard/CarCard";
import CarCardBookActions from "../carCard/CarCardBookActions";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 10
  },
  gridItem: {
    padding: 0,
    margin: "auto"
  }
}));

function CarList(props) {
  const classes = useStyles();
  if (props.cars.length === 0)
    return (
      <Typography
        fullWidth
        style={{ backgroundColor: "white", height: "400px" }}
      >
        EMPTY :C
      </Typography>
    );

  return (
    <Grid
      container
      spacing={3}
      justify="flex-start"
      alignContent={"center"}
      alignItems={"center"}
      className={classes.root}
    >
      {props.cars.map(car => (
        <Grid
          className={classes.gridItem}
          item
          key={car.id}
          xs={12}
          md={6}
          lg={4}
        >
          <CarCard
            car={car}
            handleCarSelect={props.handleCarSelect}
            actions={CarCardBookActions}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default CarList;
