import React, { Component } from 'react'
import {Grid} from "@material-ui/core"

import CarCard from './CarCard'
export class CarList extends Component {

    constructor(props) {
        super(props)
        
    }


    render() {
        return (
                <Grid container spacing={3} justify="center">
                    {this.props.cars.map((car) => 
                    <Grid item>
                        <CarCard car={car}/>
                    </Grid>
                    
                    )}
                </Grid>
                    
                
        )
    }
}

export default CarList
