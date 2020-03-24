import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
//TODO EMPTY LIST INFO
import CarCard from "./card/CarCard";
import CarCardBookActions from "./card/CarCardBookActions";

const useStyles = makeStyles(theme => ({
  gridItem: {
    padding: 0,
    margin: 0
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
      spacing={2}
      justify="center"
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
          sm={"auto"}
          lg={4}
          xl={3}
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
