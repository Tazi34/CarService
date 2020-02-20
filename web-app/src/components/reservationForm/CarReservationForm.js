import React, { Component } from 'react'
import { Grid, InputLabel, FormControl, Select, MenuItem, makeStyles } from '@material-ui/core'
import { MockedCities } from '../../MockData/mockedCities'


const styles = {

    formControl: {
        minWidth: 120,
        width:120,
    },
};

export default class CarReservationForm extends Component {
    constructor(props){
        super(props)
        //this.classes = useStyles();
        this.state = {
            sourceCity:{ name:'', locations:[]},
            destinationCity:{ name:'', locations:[]},
            sourceLocation:'',
            destinationLocation:'',
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        console.log(event)
        this.setState({
          [name]: value
        });
      }

    render() {
        const sourceCity = this.state.sourceCity;
        const destinationCity = this.state.destinationCity;
     

        return (
            <form noValidate autoComplete="off" style={{ border: "solid black 2px" }}>
                <Grid container direction="column">
                    <FormControl style={styles.width}>
                        <InputLabel id="sourceCityLabel">Source city</InputLabel>
                        <Select
                            labelId="sourceCityLabel"
                            id="sourceCitySelect"
                            onChange={this.handleChange}
                            value={this.state.sourceCity}
                            name="sourceCity"
                        >
                            {MockedCities.map((city) => <MenuItem value={city}>{city.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    
                    <FormControl style={styles.width}>
                        <InputLabel id="sourceLocationLabel">Location</InputLabel>
                        <Select
                            labelId="sourceLocationLabel"
                            id="sourceLocationSelect"
                            onChange={this.handleChange}
                            value={this.sourceLocation}
                            name="sourceLocation"
                        >
                            {sourceCity.locations.map((location) => <MenuItem value={location}> {location} </MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl style={styles.width}>
                        <InputLabel id="destinationCityLabel">Destination city</InputLabel>
                        <Select
                            labelId="destinationCityLabel"
                            id="destinationCity"
                            onChange={this.handleChange}
                            value={this.state.destinationCity}
                            name="destinationCity"
                        >
                            {MockedCities.map((city) => <MenuItem value={city}>{city.name}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl style={styles.width}>
                        <InputLabel id="destinationLocationLabel">Location</InputLabel>
                        <Select
                            labelId="destinationLocationLabel"
                            id="destinationLocationSelect"
                            onChange={this.handleChange}
                            value={this.destinationLocation}
                            name="destinationLocation"
                        >
                         {destinationCity.locations.map((location) => <MenuItem value={location}> {location} </MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
            </form>
        )
    }
}


