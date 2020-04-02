import React from "react";
import {
  CardContent,
  Divider,
  Grid,
  makeStyles,
  Tooltip,
  Typography
} from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import Filter5Icon from "@material-ui/icons/Filter5";

const useStyles = makeStyles({
  title: {
    fontWeight: 500,
    paddingTop: 0
  },
  iconContainer: {
    paddingTop: 10,
    marginBottom: -20
  },
  icon: {
    fontSize: 35
  }
});

export const CarCardContent = props => {
  const car = props.car;
  const classes = useStyles();
  return (
    <CardContent>
      <Typography
        gutterBottom
        component="h2"
        className={classes.title}
        noWrap={true}
      >
        {car.make + " " + car.model}
      </Typography>
      <Typography>{car.price}</Typography>
      <Divider />
      <Grid
        container
        spacing={1}
        direction="row"
        className={classes.iconContainer}
      >
        <Grid item>
          <Tooltip title="Air conditioning" placement="top">
            <AcUnitIcon className={classes.icon} fontSize="large" />
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Seats" placement="top">
            <Filter5Icon
              className={classes.icon}
              style={{ color: "green" }}
              fontSize="large"
            />
          </Tooltip>
        </Grid>
      </Grid>
    </CardContent>
  );
};
