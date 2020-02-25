import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import CarList from './CarList';
import { fetchCarPage, setCurrentPage } from '../../redux/pagination/paginationActions';
import { withRouter } from 'react-router-dom';
 class VisibleCarList extends Component {
    
    componentDidMount(){
            this.props.getCarsPage(0);
     
    }
    render() {
        if(!this.props.cars  || !this.props.getCarsPage)
            return null
        var cars = this.props.cars;
        console.log(this.props)
       
 
        if (this.props.cars.isFetching || !this.props.cars.fetched)
            return <Typography>Loading...</Typography>

        return (
            <Grid container direction="column" alignItems="center" alignContent="center" style={{ width: "80%", margin: "auto", }}>

                <Grid item >
                    <CarList cars={cars.byId.map(id => cars.items[id])}></CarList>
                </Grid>
                <Grid item>
                    <Pagination count={this.props.pagination.totalPages} onChange={(event, page) => this.props.getCarsPage(page - 1)}></Pagination>
                </Grid>

            </Grid>

        )
    }
}

const mapStateToProps = (state) => {
    return{
        cars: state.cars.cars,
        pagination: state.pagination,
    }
}

const mapDispatchToProps = {
    getCarsPage: fetchCarPage,
    setPage: setCurrentPage,
}

export default connect(mapStateToProps, mapDispatchToProps)(VisibleCarList)
