import React from "react";
import DateLocationForm from "../../dateLocation/DateLocationWindow";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { WelcomeWindow } from "./WelcomeWindow";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    transform: "translateY(10%)",
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

export default function Home({ history }) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.desktopSection}>
        <Grid
          container
          direction={"row"}
          className={classes.root}
          justify={"center"}
          spacing={6}
        >
          <Grid
            item
            className={`${classes.gridItem} ${classes.dateLocation}`}
            xs={"auto"}
          >
            <DateLocationForm
              history={history}
              className={classes.dateLocation}
            />
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
        <DateLocationForm history={history} className={classes.dateLocation} />
      </div>
    </div>
  );
}
