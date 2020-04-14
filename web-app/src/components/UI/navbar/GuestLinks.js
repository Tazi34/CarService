import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";

const style = makeStyles(theme => ({
  fakeLink: {
    margin: "auto",
    padding: "30px 30px",
    color: "white",
    "&:hover": {
      color: theme.palette.primary.main,
      textDecoration: "none"
    },
    textDecoration: "none",
    cursor: "pointer"
  }
}));

export function GuestLinks() {
  const classes = style();
  return (
    <>
      <ListItem className={classes.fakeLink}>
        <Typography>CONTACT</Typography>
      </ListItem>
      <ListItem className={classes.fakeLink}>
        <Typography>ABOUT</Typography>
      </ListItem>
    </>
  );
}
