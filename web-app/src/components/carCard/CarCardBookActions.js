import React from "react";
import { CardActions } from "@material-ui/core";
import BookCarButton from "./BookCarButton";

const CarCardBookActions = props => {
  return (
    <CardActions>
      <BookCarButton car={props.car} handleCarSelect={props.handleCarSelect} />
    </CardActions>
  );
};
export default CarCardBookActions;
