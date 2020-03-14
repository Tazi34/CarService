import React from "react";
import { Grid, Typography } from "@material-ui/core";
//TODO EMPTY LIST INFO
import CarCard from "./CarCard";

function CarList(props) {
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
    <Grid container spacing={4} justify="center" alignContent={"center"}>
      {props.cars.map(car => (
        <Grid item key={car.id} xs={12} sm={"auto"} lg={4} xl={3} md={6}>
          <CarCard carSelectionHandler={props.carSelectionHandler} car={car} />
        </Grid>
      ))}
    </Grid>
  );
}

export default CarList;
