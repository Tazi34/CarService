import React from "react";
import DateLocationForm from "../../bookingForm/DateLocationForm";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { WelcomeWindow } from "./WelcomeWindow";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    transform: "translateY(50%)",
    top: "50%",
    width: "80%",
    direction: "column",
    margin: "auto"
  },
  gridItem: {},
  dateLocation: {
    order: 1,
    [theme.breakpoints.down("xs")]: {
      order: 2
    }
  },
  welcomeWindow: {
    order: 2,
    [theme.breakpoints.down("sm")]: {
      order: 1,
      display: "none"
    }
  }
}));

export default function Home(props) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction={"row"}
      className={classes.root}
      justify={"flex-end"}
      spacing={6}
    >
      <Grid
        item
        className={`${classes.gridItem} ${classes.dateLocation}`}
        xs={"auto"}
      >
        <DateLocationForm
          history={props.history}
          className={classes.dateForm}
        ></DateLocationForm>
      </Grid>

      <Grid
        item
        className={`${classes.gridItem} ${classes.welcomeWindow}`}
        xs={7}
      >
        <WelcomeWindow />
      </Grid>
    </Grid>
  );
}
