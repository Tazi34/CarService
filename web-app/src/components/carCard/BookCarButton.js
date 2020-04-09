import React from "react";
import { Button } from "@material-ui/core";

const BookCarButton = ({ onCarSelect, car, ...props }) => {
  return (
    <Button
      {...props}
      variant="contained"
      size="small"
      color="primary"
      onClick={() => onCarSelect(car)}
    >
      BOOK
    </Button>
  );
};

export default BookCarButton;
