import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { fetchCities } from "../../redux/city/cityActions";
import {
  setEndCity,
  setEndDate,
  setEndSpot,
  setStartCity,
  setStartDate,
  setStartSpot
} from "../../redux/reservation/reservationActions";

//TODO reuse date + location
class DateLocationCarForm extends Component {
  componentDidMount() {
    this.props.getCities();
  }
  mapIdToCity = id => {
    return this.props.cities.items[id];
  };
  mapIdToSpot = id => {
    return this.props.spots.items[id];
  };

  render() {
    var reservation = this.props.reservation;
    var startCity = reservation.startCity;
    var endCity = reservation.endCity;
    //map ids to items
    var cities = this.props.cities.byId.map(this.mapIdToCity);

    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ backgroundColor: "white", padding: "5px" }}
          >
            <Grid item container direction="row">
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="label">Source city</InputLabel>
                  <Select
                    labelId="cityLabel"
                    onChange={e => {
                      this.props.setStartCity(this.mapIdToCity(e.target.value));
                    }}
                    value={startCity.item.id}
                    name="city"
                  >
                    <MenuItem value={-1} disabled>
                      Source city
                    </MenuItem>
                    {cities.map(city => (
                      <MenuItem value={city.id} key={city.id}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="spotLabel">Location</InputLabel>
                  <Select
                    disabled={!startCity.selected}
                    type="controlled"
                    labelId="spotLabel"
                    id="spotSelect"
                    onChange={e =>
                      this.props.setStartSpot(this.mapIdToSpot(e.target.value))
                    }
                    value={reservation.startSpot.id}
                    name="spot"
                  >
                    <MenuItem value={-1} disabled>
                      Spot
                    </MenuItem>
                    {startCity.item.spots.map(spot => (
                      <MenuItem value={spot.id}> {spot.name} </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item container direction="row" justify="center">
              <Grid item xs={6}>
                <KeyboardDatePicker
                  fullWidth
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  name="date"
                  label="Start date"
                  value={reservation.startDate}
                  onChange={date => {
                    this.props.setStartDate(new Date(date).toISOString());
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardTimePicker
                  fullWidth
                  margin="normal"
                  label="Start time"
                  name="time"
                  value={reservation.startDate}
                  onChange={date => this.props.setStartDate(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change time"
                  }}
                />
              </Grid>
            </Grid>

            <Grid item container direction="row">
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="endCityLabel">Destination city</InputLabel>
                  <Select
                    labelId="endCityLabel"
                    onChange={e => {
                      this.props.setEndCity(this.mapIdToCity(e.target.value));
                    }}
                    value={endCity.item.id}
                    name="endCity"
                  >
                    <MenuItem value={-1} disabled>
                      Destination city
                    </MenuItem>
                    {cities.map(city => (
                      <MenuItem value={city.id}>{city.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="endspotLabel">Spot</InputLabel>
                  <Select
                    disabled={!endCity.selected}
                    type="controlled"
                    labelId="endspotLabel"
                    id="endspotSelect"
                    onChange={e =>
                      this.props.setEndSpot(this.mapIdToSpot(e.target.value))
                    }
                    value={reservation.endSpot.id}
                    name="spot"
                  >
                    <MenuItem value={-1} disabled>
                      Spot
                    </MenuItem>
                    {endCity.item.spots.map(spot => (
                      <MenuItem value={spot.id}> {spot.name} </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid item container direction="row" justify="center">
              <Grid item xs={6}>
                <KeyboardDatePicker
                  fullWidth
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  name="date"
                  label="End date"
                  value={reservation.endDate}
                  onChange={date => this.props.setEndDate(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardTimePicker
                  fullWidth
                  margin="normal"
                  label="End time"
                  name="time"
                  value={reservation.endDate}
                  onChange={date => this.props.setEndDate(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change time"
                  }}
                />
              </Grid>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                component={RouterLink}
                to="/cars"
              >
                Find Available
              </Button>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

const mapStateToprops = state => {
  return {
    reservation: state.reservations,
    cities: state.cities,
    spots: state.spots
  };
};
const mapDispatchToprops = {
  setStartDate: setStartDate,
  setStartSpot: setStartSpot,
  setEndDate: setEndDate,
  setEndSpot: setEndSpot,
  getCities: fetchCities,
  setStartCity: setStartCity,
  setEndCity: setEndCity
};

export default connect(
  mapStateToprops,
  mapDispatchToprops
)(DateLocationCarForm);
