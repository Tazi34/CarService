import React from "react";

import { Container } from "@material-ui/core";
import DateLocationForm from "../bookingForm/DateLocationForm";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center"
  }
}));

export default function Home(props) {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <DateLocationForm
        history={props.history}
        className={classes.dateForm}
      ></DateLocationForm>
    </Container>
  );
}
