import React, { Component } from 'react'
import { Box, Grid } from '@material-ui/core';
import CarList from './CarList';
import Pagination from '@material-ui/lab/Pagination';
import { MockedCars } from '../../MockData/mockedCars';
export class VisibleCarList extends Component {
    constructor(props){
        super(props);
        this.state = {
            cars: MockedCars,
            currentPage:1,
            pageCount:10,
        }

    }
    getVisibleCars(cars,filter){

    }
    render() {
        return (
            <Grid container direction="column"  alignItems="center" alignContent="center" style={{maxWidth:"1400px", margin:"auto"}}>
                <CarList cars={this.state.cars}></CarList>
                <Pagination count={10} page={this.state.currentPage}></Pagination>
            </Grid>
            
        )
    }
}

export default VisibleCarList
