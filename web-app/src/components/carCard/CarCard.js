import { Card, CardMedia, makeStyles } from "@material-ui/core";

import React from "react";
import { transparentCars } from "../../images/carImages";
import { CarCardContent } from "./CarCardContent";
import CarCardBookActions from "./CarCardBookActions";

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.background,
    maxWidth: 500,
    padding: 10,
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

function CarCard({ car, onCarSelect, ...props }) {
  const classes = useStyles();

  if (!car) return null;

  return (
    <Card className={classes.root} {...props}>
      <CardMedia className={classes.media} title={car.make + " " + car.model}>
        <img
          alt={car.make + " " + car.model}
          className={classes.image}
          src={
            transparentCars[Math.floor(Math.random() * transparentCars.length)]
          }
        />
      </CardMedia>
      <CarCardContent car={car} />
      <CarCardBookActions car={car} onCarSelect={onCarSelect} />
    </Card>
  );
}

export default CarCard;
