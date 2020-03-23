import makeStyles from "@material-ui/core/styles/makeStyles";
import { Link as RouterLink } from "react-router-dom";
import * as React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";

const style = makeStyles(theme => ({
  link: {
    margin: "auto",
    padding: "30px 30px",
    color: "white",
    "&:hover": {
      color: theme.palette.primary.main,
      textDecoration: "none"
    },
    textDecoration: "none"
  }
}));

export function NavBarLink(props) {
  const classes = style();

  return (
    <ListItem>
      <Link component={RouterLink} to={props.to} className={classes.link}>
        <Typography>{props.children}</Typography>
      </Link>
    </ListItem>
  );
}
