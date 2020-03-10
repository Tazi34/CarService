import {
  Button,
  Card,
  CardActionArea,
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
import { useHistory } from "react-router-dom";
import carImage from "../../sampleCar.png";

const useStyles = makeStyles(theme => ({
  root: {
    background: "#d1c5c5",
    padding: 5,
    border: "2px solid black",
    minWidth: "400px"
  },
  title: {
    fontWeight: 700,
    paddingTop: 10
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
    height: 0,
    paddingTop: "100%", // 16:9,
    marginTop: "30"
  }
}));
function CarCard(props) {
  const history = useHistory();
  const classes = useStyles();
  var car = props.car;
  if (!car) return null;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <CardMedia
            style={{ height: 0, paddingTop: "56.25%" }}
            image={carImage}
            title={car.make + " " + car.model}
          />
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
          >
            {car.make + " " + car.model}
          </Typography>
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
              <Tooltip
                className={classes.tooltip}
                title="Seats"
                placement="top"
              >
                <Filter5Icon
                  className={classes.icon}
                  style={{ color: "green" }}
                  fontSize="large"
                />
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
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
