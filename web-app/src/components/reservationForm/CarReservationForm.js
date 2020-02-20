import React, { Component } from 'react'
import { Grid, InputLabel, FormControl, Select, MenuItem, makeStyles } from '@material-ui/core'
import { MockedCities } from '../../MockData/mockedCities'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import LocationAndDatePicker from './LocationAndDatePicker';



const styles = {
    container:{
        minWidth:"400px",
        maxWidth:"400px",
        padding:"10px",
        border:"solid black 1px",
        margin:"10px",
    }
    
};

export default class CarReservationForm extends Component {
    constructor(props) {
        super(props)
        //this.classes = useStyles();
        var startDate = new Date();
        var endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1);

        this.state = {
            startData: {
                city: { name: '', locations: [] },
                location: '',
                date: startDate,
            },
            endData: {
                city: { name: '', locations: [] },
                location: '',
                date: endDate,
            },
        }
        this.handleDataChange = this.handleDataChange.bind(this)



    }

    handleDataChange(event, dataName) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        var property = { ...this.state[dataName] }
        property[name] = value
        this.setState({ [dataName]: property });
    }

    render() {
        return (
            <form>
                <Grid spacing={5} container direction="column" style={styles.container}>
                    <Grid item>
                        <LocationAndDatePicker
                            name="startData"
                            data={this.state.startData}
                            handleChange={this.handleDataChange}>
                        </LocationAndDatePicker>
                    </Grid>
                    <Grid item>
                        <LocationAndDatePicker
                            name="endData"
                            data={this.state.endData}
                            handleChange={this.handleDataChange}>
                        </LocationAndDatePicker>
                    </Grid>
                </Grid>
            </form>
        )
    }
}


