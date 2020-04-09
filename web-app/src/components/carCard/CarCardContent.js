import React from "react";
import {
  CardContent,
  Divider,
  makeStyles,
  Tooltip,
  Typography
} from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import Filter5Icon from "@material-ui/icons/Filter5";
import AutomaticTransmissionIcon from "../../images/carCard/automatic_transmission_2.png";
import Box from "@material-ui/core/Box";

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
    fontSize: 35,
    padding: 5,
    margin: 5,
    paddingLeft: 0,
    marginLeft: 0
  }
});

export const CarCardContent = ({ car, ...props }) => {
  const classes = useStyles();
  return (
    <CardContent {...props}>
      <Typography
        gutterBottom
        component="h2"
        className={classes.title}
        noWrap={true}
      >
        {car.make + " " + car.model}
      </Typography>
      <Typography>{car.price} PLN/day</Typography>
      <Divider />
      <Box display={"flex"} className={classes.iconContainer}>
        <div className={classes.icon}>
          <Tooltip title="Air conditioning" placement="top">
            <AcUnitIcon />
          </Tooltip>
        </div>

        <div className={classes.icon}>
          <Tooltip title="Transmission" placement="top">
            <img
              alt={"Transmission"}
              style={{ height: "35px", width: "35px" }}
              src={AutomaticTransmissionIcon}
            />
          </Tooltip>
        </div>

        <div className={classes.icon}>
          <Tooltip title="Seats" placement="top">
            <Filter5Icon style={{ color: "green" }} />
          </Tooltip>
        </div>
      </Box>
    </CardContent>
  );
};
