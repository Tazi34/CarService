import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { RedirectButton } from "../UI/RedirectButton";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "400px"
  },
  text: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    }
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center"
  }
}));

export const EmptyReservationsAlert = props => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction={"column"}
      justify={"center"}
      className={classes.root}
      alignItems={"center"}
      spacing={3}
      {...props}
    >
      <Grid item>
        <Typography className={classes.text} variant={"h4"}>
          Its so empty here...
        </Typography>
      </Grid>
      <Grid item>
        <div className={classes.buttonContainer}>
          <RedirectButton to={"/"} color={"primary"} variant={"contained"}>
            Book now
          </RedirectButton>
        </div>
      </Grid>
    </Grid>
  );
};
