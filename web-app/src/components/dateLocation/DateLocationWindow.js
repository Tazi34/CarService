import DateFnsUtils from "@date-io/date-fns";
import { Button, Grid, withStyles } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { fetchCities } from "../../redux/city/cityActions";
import {
  confirmDateLocation,
  setEndCity,
  setEndDate,
  setEndSpot,
  setStartCity,
  setStartDate,
  setStartSpot
} from "../../redux/booking/bookingActions";
import Paper from "@material-ui/core/Paper";
import { carsPage } from "../../utilities/urls/pages";
import { LocationPicker } from "../locationPicker/LocationPicker";
import { DatePicker } from "../datePicker/DatePicker";
import moment from "moment";

const styles = theme => ({
  root: {
    borderRadius: 5,
    minWidth: "200px",
    margin: "auto",
    padding: "20px",
    border: "1px solid black",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
      boxShadow: "10px"
    }
  }
});

class DateLocationWindow extends Component {
  componentDidMount() {
    this.props.getCities();
  }

  submit = () => {
    this.props.confirmSelection();
    this.props.history.push(carsPage);
  };

  render() {
    const { classes, reservation, spots, cities } = this.props;
    const {
      startCity,
      endCity,
      startDate,
      endDate,
      startSpot,
      endSpot
    } = reservation;
    const {
      setStartCity,
      setStartDate,
      setStartSpot,
      setEndCity,
      setEndSpot,
      setEndDate
    } = this.props;

    const selected =
      startCity.selected &&
      endCity.selected &&
      startSpot.selected &&
      endSpot.selected;
    return (
      <Paper className={classes.root}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container direction={"column"}>
            <Grid item>
              <LocationPicker
                currentSpot={startSpot}
                currentCity={startCity}
                cities={cities}
                spots={spots}
                setCity={setStartCity}
                setSpot={setStartSpot}
              />
            </Grid>
            <Grid item>
              <DatePicker
                date={startDate}
                dateLabel={"Start date"}
                onDateChange={setStartDate}
                minDate={moment()}
              />
            </Grid>
            <Grid item>
              <LocationPicker
                currentSpot={endSpot}
                currentCity={endCity}
                cities={cities}
                spots={spots}
                setCity={setEndCity}
                setSpot={setEndSpot}
              />
            </Grid>
            <Grid item>
              <DatePicker
                date={endDate}
                dateLabel={"End date"}
                onDateChange={setEndDate}
                minDate={moment(startDate).add(1, "days")}
              />
            </Grid>
            <Grid item>
              <Button
                disabled={!selected}
                fullWidth
                color="primary"
                variant="contained"
                onClick={this.submit}
              >
                Find Available
              </Button>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    reservation: state.bookingForm.reservation,
    cities: state.cities,
    spots: state.spots
  };
};
const mapDispatchToProps = {
  setStartDate,
  setStartSpot,
  setEndDate,
  setEndSpot,
  getCities: fetchCities,
  setStartCity: setStartCity,
  setEndCity: setEndCity,
  confirmSelection: confirmDateLocation
};

export default compose(
  withStyles(styles, { name: "DateLocation" }),
  connect(mapStateToProps, mapDispatchToProps)
)(DateLocationWindow);
