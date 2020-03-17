import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  makeStyles,
  Tooltip,
  Typography
} from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import Filter5Icon from "@material-ui/icons/Filter5";
import React from "react";
import carImages from "../../images/carImages";

const useStyles = makeStyles(theme => ({
  root: {
    background: "white",
    borderRadius: "4px",
    minWidth: "300px",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  title: {
    fontWeight: 500,
    paddingTop: 0
  },
  tooltip: {
    color: purple
  },
  iconContainer: {
    paddingTop: 10,
    marginBottom: -20
  },
  icon: {
    fontSize: 35
  },
  image: {
    paddingTop: "100%", // 16:9,
    minHeight: 300
  }
}));
function CarCard(props) {
  const classes = useStyles();
  const car = props.car;
  if (!car) return null;

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.image}
        image={carImages[Math.floor(Math.random() * carImages.length)]}
        title={car.make + " " + car.model}
      />

      <CardContent>
        <Typography gutterBottom component="h2" className={classes.title}>
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
            <Tooltip
              className={classes.tooltip}
              title="Air conditioning"
              placement="top"
            >
              <AcUnitIcon className={classes.icon} fontSize="large" />
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip className={classes.tooltip} title="Seats" placement="top">
              <Filter5Icon
                className={classes.icon}
                style={{ color: "green" }}
                fontSize="large"
              />
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => {
            props.carSelectionHandler(car);
          }}
        >
          BOOK
        </Button>
        <Button variant="outlined" size="small" color="primary">
          DETAILS
        </Button>
      </CardActions>
    </Card>
  );
}

export default CarCard;
