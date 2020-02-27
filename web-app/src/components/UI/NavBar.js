import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import React from "react";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 0
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  navbarItem: {
    color: "white"
  }
}));
export function NavBar() {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <DirectionsCarIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          CarServices
        </Typography>

        <Button className={classes.navbarItem}>reservation</Button>
        <Button className={classes.navbarItem}>reservation</Button>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
