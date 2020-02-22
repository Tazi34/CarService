import React, { Component } from 'react'
import {Grid} from "@material-ui/core"

import CarCard from './CarCard'
export class CarList extends Component {

 


    render() {
        return (
                <Grid container spacing={3} justify="center">
                    {this.props.cars.map((car) => 
                    <Grid item key={car.id}>
                        <CarCard car={car}/>
                    </Grid>
                    
                    )}
                </Grid>
                    
                
        )
    }
}

export default CarList
