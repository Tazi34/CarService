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
    direction: "column",
    margin: "auto"
  },
  mobileSection: {
    display: "none",
    maxWidth: 500,
    margin: "auto",
    marginTop: 70,
    [theme.breakpoints.down(1100)]: {
      display: "block"
    }
  },
  desktopSection: {
    [theme.breakpoints.down(1100)]: {
      display: "none"
    }
  }
}));

export default function Home(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.desktopSection}>
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
              className={classes.dateLocation}
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
      </div>
      <div className={classes.mobileSection}>
        <DateLocationForm
          history={props.history}
          className={classes.dateLocation}
        ></DateLocationForm>
      </div>
    </>
  );
}
