import React from "react";
import { Button } from "@material-ui/core";

const BookCarButton = props => {
  return (
    <Button
      variant="contained"
      size="small"
      color="primary"
      onClick={() => props.handleCarSelect(props.car)}
    >
      BOOK
    </Button>
  );
};

export default BookCarButton;
