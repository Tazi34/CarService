import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    border: "solid 4px red",
    width: "1000px",
    height: "10vh",
    backgroundColor: "white"
  }
}));

export const EmptyReservationsAlert = props => {
  const classes = useStyles();
  return <div className={classes.root}>xsdd</div>;
};
