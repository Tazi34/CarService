import React from "react";
import { CardActions } from "@material-ui/core";
import BookCarButton from "./BookCarButton";

const CarCardBookActions = ({ car, onCarSelect, ...props }) => {
  return (
    <CardActions {...props}>
      <BookCarButton car={car} onCarSelect={onCarSelect} />
    </CardActions>
  );
};
export default CarCardBookActions;
