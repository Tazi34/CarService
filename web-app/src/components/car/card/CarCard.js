import { Card, CardActions, CardMedia, makeStyles } from "@material-ui/core";

import React from "react";
import { transparentCars } from "../../../images/carImages";
import { CarCardContent } from "./CarCardContent";

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.background,
    minWidth: "275px",
    maxWidth: "400px",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    },
    padding: 0,
    margin: "0 auto"
  },
  media: {
    padding: 10
  },
  image: {
    width: "100%",
    height: "400px",
    border: "1px #f4f4f4 solid"
  }
}));

function CarCard(props) {
  const classes = useStyles();
  const car = props.car;
  const CardActions = props.actions;

  if (!car) return null;

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} title={car.make + " " + car.model}>
        <img
          className={classes.image}
          src={
            transparentCars[Math.floor(Math.random() * transparentCars.length)]
          }
        />
      </CardMedia>
      <CarCardContent car={car} />
      {CardActions && <CardActions />}
    </Card>
  );
}

export default CarCard;
