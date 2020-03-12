import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import * as React from "react";

const style = makeStyles(theme => ({
  button: {
    margin: "auto",
    color: "white",
    fontFamily: "Playfair Display; serif",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

export function NavBarLink(props) {
  const classes = style();
  return (
    <Button component={Link} to={props.to} className={classes.button}>
      {props.children}
    </Button>
  );
}
