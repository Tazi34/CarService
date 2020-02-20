import React, { Component } from 'react'
import { Grid, InputLabel, FormControl, Select, MenuItem, makeStyles } from '@material-ui/core'
import { MockedCities } from '../../MockData/mockedCities'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const styles = {

    formControl: {
        flex:1,
    },
};
export class LocationAndDatePicker extends Component {

    handleChange = (event) => {
        this.props.handleChange(event,this.props.name)
    }
    render() {
        //console.log(this.props);
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container direction="column" justify="center" >
                        <FormControl style={styles.formControl}>
                            <InputLabel id="label">Source city</InputLabel>
                            <Select
                                labelId="cityLabel"
                                onChange={this.handleChange}
                                value={this.props.data.city}
                                name="city"
                            >
                                {MockedCities.map((city) => <MenuItem value={city}>{city.name}</MenuItem>)}
                            </Select>
                        </FormControl>

                        <FormControl style={styles.formControl}>
                            <InputLabel id="locationLabel">Location</InputLabel>
                            <Select
                                labelId="locationLabel"
                                id="locationSelect"
                                onChange={this.handleChange}
                                value={this.props.data.location}
                                name="location"
                            >
                                {this.props.data.city.locations.map((location) => <MenuItem value={location}> {location} </MenuItem>)}
                            </Select>
                        </FormControl>

                        <Grid  container direction="row" justify="center">
                            <KeyboardDatePicker
                                style={{flex:1,margin:"5px 5px"}}
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                name="date"
                                label="Date picker"
                                value={this.props.data.date}
                                onChange={(date) => this.handleChange({target: {name:"date",value:date}},this.props.name)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardTimePicker
                                style={{flex:1,margin:"5px 5px"}}
                                margin="normal"
                                id="time-picker"
                                label="Time picker"
                                name="time"
                                value={this.props.data.date}
                                onChange={(date) => this.handleChange({target: {name:"date",value:date}})}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                    </Grid>
            </MuiPickersUtilsProvider>
        )
    }
}

export default LocationAndDatePicker
