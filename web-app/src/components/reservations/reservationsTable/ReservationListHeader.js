import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    padding: "10px 50px"
  }
});
export const ReservationListHeader = props => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} alignItems={"center"} spacing={2}>
      <Grid item xs={3}>
        <Typography align={"center"}>date</Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography align={"center"}>location</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align={"center"}>car</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography align={"right"}>price</Typography>
      </Grid>
    </Grid>
  );
};
