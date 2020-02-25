import { FormControl, Grid, Select, Typography, Button } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCarPage, setCurrentPage, setSorting } from '../../redux/pagination/paginationActions';
import CarList from './CarList';
import { OrderCarsBy } from './FieldsConst';



class VisibleCarList extends Component {


    componentDidMount() {
        this.getCarsPage(0)
    }

    getCarsPage = (page) => {
        var pagination = this.props.pagination;
        //IF NOT FETCHED
        if (!pagination.pages[page]) {
            var sorting = pagination.sorting;
            this.props.fetchCarPage(page, sorting.field, sorting.order)
        }
        //IF ALREADY IN STORE
        else {
            this.props.setPage(page)
        }
    }
    getFieldSortOptions() {
        var options = [];
        for (var sortOption in OrderCarsBy){
            var option = OrderCarsBy[sortOption];
            options.push(<option value={option.value}>{option.display}</option>)
        }
        return options;
    }


    render() {
        if (!this.props.cars)
            return null

        var cars = this.props.cars;
        var pagination = this.props.pagination;
        var sorting = this.props.pagination.sorting;

        if (cars.isFetching || !cars.fetched)
            return <Typography>Loading...</Typography>

        var currentPage = pagination.pages[pagination.currentPage];

        return (
            <Grid container direction="column" alignItems="center" alignContent="center" style={{ width: "80%", margin: "auto", }}>

                <flexbox>
                    <FormControl variant="outlined" >
                        <Select
                            native
                            defaultValue=""
                            onChange={(event) => this.props.setSorting(event.target.value,sorting.order)}
                        >
                            <option value="" disabled>Sort by </option>
                            {this.getFieldSortOptions()}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" >
                        <Select
                            native
                            defaultValue="">
                            <option value="" disabled>Sort Order</option>
                            <option value={10}>Ascending</option>
                            <option value={20}>Descending</option>
                        </Select>
                    </FormControl>
                    <Button variant="contained">Apply</Button>
                </flexbox>


                <Grid item >
                    <CarList cars={currentPage.ids.map(id => cars.items[id])}></CarList>
                </Grid>
                <Grid item>
                    <Pagination count={pagination.totalPages} onChange={(event, page) => {
                        this.getCarsPage(page - 1);
                    }
                    }></Pagination>
                </Grid>
            </Grid>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        cars: state.cars,
        pagination: state.pagination,
    }
}

const mapDispatchToProps = {
    setSorting: setSorting,
    fetchCarPage: fetchCarPage,
    setPage: setCurrentPage,
}

export default connect(mapStateToProps, mapDispatchToProps)(VisibleCarList)
