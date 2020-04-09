import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  boldText: {
    fontWeight: 600
  }
});

export const DatesCell = ({ startDate, endDate, ...props }) => {
  const classes = useStyles();

  return (
    <Grid container alignItems={"center"} {...props}>
      <Grid item xs={4}>
        <Typography align={"center"} className={classes.boldText}>
          {startDate.month}
        </Typography>
        <Typography
          align={"center"}
          variant={"h5"}
          className={classes.boldText}
        >
          {startDate.day}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography align={"center"}>to</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography align={"center"} className={classes.boldText}>
          {endDate.month}
        </Typography>
        <Typography
          align={"center"}
          variant={"h5"}
          className={classes.boldText}
        >
          {endDate.day}
        </Typography>
      </Grid>
    </Grid>
  );
};
