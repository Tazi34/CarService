import DateFnsUtils from "@date-io/date-fns";
import {
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
import React, { useState } from "react";
import { MockedCities } from "../../MockData/mockedCities";
import {
  setStartDate,
  setStartSpot,
  setEndDate,
  setEndSpot
} from "../../redux/reservation/reservationActions";
import { connect } from "react-redux";
const styles = {
  formControl: {
    flex: 1
  }
};

function DateLocationCarForm(props) {
  const [startCity, setStartCity] = useState(MockedCities[0]);
  const [endCity, setEndCity] = useState(MockedCities[0]);
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container direction="column" justify="center">
          <FormControl style={styles.formControl}>
            <InputLabel id="label">Source city</InputLabel>
            <Select
              labelId="cityLabel"
              onChange={e => {
                setStartCity(e.target.value);
              }}
              value={startCity}
              name="city"
            >
              {MockedCities.map(city => (
                <MenuItem value={city}>{city.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl style={styles.formControl}>
            <InputLabel id="spotLabel">Location</InputLabel>
            <Select
              type="controlled"
              labelId="spotLabel"
              id="spotSelect"
              onChange={e => props.setStartSpot(e.target.value)}
              value={props.startSpot}
              name="spot"
            >
              {startCity.spots.map(spot => (
                <MenuItem value={spot}> {spot} </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Grid container direction="row" justify="center">
            <KeyboardDatePicker
              style={{ flex: 1, margin: "5px 5px" }}
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              name="date"
              label="Start date"
              value={props.startDate}
              onChange={date => props.setStartDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
            <KeyboardTimePicker
              style={{ flex: 1, margin: "5px 5px" }}
              margin="normal"
              id="time-picker"
              label="Start time"
              name="time"
              value={props.startDate}
              onChange={date => props.setStartDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </Grid>

          {/*END DATE*/}

          <FormControl style={styles.formControl}>
            <InputLabel id="endCityLabel">End city</InputLabel>
            <Select
              labelId="endCityLabel"
              onChange={e => {
                setEndCity(e.target.value);
              }}
              value={endCity}
              name="city"
            >
              {MockedCities.map(city => (
                <MenuItem value={city}>{city.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl style={styles.formControl}>
            <InputLabel id="endSpotLabel">Location</InputLabel>
            <Select
              labelId="endSpotLabel"
              onChange={e => props.setEndSpot(e.target.value)}
              value={props.endSpot}
              name="spot"
            >
              {endCity.spots.map(spot => (
                <MenuItem value={spot}> {spot} </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Grid container direction="row" justify="center">
            <KeyboardDatePicker
              style={{ flex: 1, margin: "5px 5px" }}
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              name="date"
              label="End date"
              value={props.endDate}
              onChange={date => props.setEndDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
            <KeyboardTimePicker
              style={{ flex: 1, margin: "5px 5px" }}
              margin="normal"
              label="End time"
              name="time"
              value={props.endDate}
              onChange={date => props.setEndDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    startDate: state.reservations.startDate,
    endDate: state.reservations.endDate,
    startSpot: state.reservations.startSpot,
    endSpot: state.reservations.endSpot
  };
};
const mapDispatchToProps = {
  setStartDate: setStartDate,
  setStartSpot: setStartSpot,
  setEndDate: setEndDate,
  setEndSpot: setEndSpot
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateLocationCarForm);
