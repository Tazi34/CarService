import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    // border: "solid 1px black",
    padding: 10
  }
  // container: {
  // top: "50%", position: "relative", transform: "translateY(-50%)"
  // }
}));

export const WelcomeWindow = props => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.container} color={"primary.contrastText"}>
        <Typography variant={"h3"}>
          MAKE YOUR
          <br /> RESERVATION
        </Typography>
        <br />
        <Typography variant={"h5"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada
          fames ac turpis egestas maecenas pharetra convallis posuere.
        </Typography>
      </Box>
    </Box>
  );
};
