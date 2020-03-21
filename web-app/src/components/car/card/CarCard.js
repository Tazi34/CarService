import { Card, CardActions, CardMedia, makeStyles } from "@material-ui/core";

import React from "react";
import carImages from "../../../images/carImages";
import { CarCardContent } from "./CarCardContent";

const useStyles = makeStyles({
  root: {
    borderRadius: "4px",
    minWidth: "300px",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  image: {
    paddingTop: "100%", // 16:9,
    minHeight: 300
  }
});

function CarCard(props) {
  const classes = useStyles();
  const car = props.car;
  const CardActions = props.actions;

  if (!car) return null;

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.image}
        image={carImages[Math.floor(Math.random() * carImages.length)]}
        title={car.make + " " + car.model}
      />
      <CarCardContent car={car} />
      {CardActions && <CardActions />}
    </Card>
  );
}

export default CarCard;
