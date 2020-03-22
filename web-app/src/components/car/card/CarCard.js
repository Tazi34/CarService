import { Card, CardActions, CardMedia, makeStyles } from "@material-ui/core";

import React from "react";
import carImages from "../../../images/carImages";
import { CarCardContent } from "./CarCardContent";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: "275px",
    maxWidth: "400px",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    },
    padding: 0,
    margin: "0 auto"
  },
  image: {
    width: "100%",
    height: "400px"
  }
}));

function CarCard(props) {
  const classes = useStyles();
  const car = props.car;
  const CardActions = props.actions;

  if (!car) return null;

  return (
    <Card className={classes.root}>
      <CardMedia title={car.make + " " + car.model}>
        <img
          className={classes.image}
          src={carImages[Math.floor(Math.random() * carImages.length)]}
        />
      </CardMedia>
      <CarCardContent car={car} />
      {CardActions && <CardActions />}
    </Card>
  );
}

export default CarCard;
