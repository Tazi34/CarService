import { FormControl, Grid, Select, Typography, Button } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCarPage, setCurrentPage, setSorting, SortFields, setSortField, setSortOrder, resetPagination, SortOrders } from '../../redux/pagination/paginationActions';
import CarList from './CarList';
import { SortCarsOrderFields } from './FieldsConst';
import SortingSelectors from '../UI/SortingSelectors';



class VisibleCarList extends Component {


    componentDidMount() {
        var sorting = this.props.sorting;
        this.getCarsPage(0, sorting.field, sorting.order)
    }

    getCarsPage = (page) => {
        var pagination = this.props.pagination;
        var sorting = this.props.sorting;
        //IF NOT FETCHED
        if (!pagination.pages[page]) {
            this.props.fetchCarPage(page, sorting.field, sorting.order)
        }
        //IF ALREADY IN STORE
        else {
            this.props.setPage(page)
        }
    }

    getFieldSortOptions = () => {
        var options = [];
        for (var sortOption in SortCarsOrderFields) {
            var option = SortCarsOrderFields[sortOption];
            options.push(<option value={option.value}>{option.display}</option>)
        }
        return options;
    }


    sortingApplyHandler = () => {
        var sorting = this.props.sorting;
        if (sorting.field && sorting.order != SortOrders.NOT_SORTED) {
            this.props.resetPages()
            this.props.fetchCarPage(0, sorting.field, sorting.order)
        }
    }



    render() {
        if (!this.props.cars)
            return null

        var cars = this.props.cars;
        var pagination = this.props.pagination;

        if (cars.isFetching || !cars.fetched)
            return <Typography>Loading...</Typography>

        var currentPage = pagination.pages[pagination.currentPage];

        return (
            <Grid container direction="column" alignItems="center" alignContent="center" style={{ width: "80%", margin: "auto", }}>
                <Grid item container justify="flex-end" direction="row">
                    <Grid item>
                        <SortingSelectors
                            fieldChanged={this.props.setSortField}
                            orderChanged={this.props.setSortOrder}
                            fieldOptions={this.getFieldSortOptions()}
                            applyHandler={this.sortingApplyHandler} />
                    </Grid>
                </Grid>

                <Grid item >
                    <CarList cars={currentPage.ids.map(id => cars.items[id])}></CarList>
                </Grid>
                <Grid item>
                    <Pagination count={pagination.totalPages} onChange={(event, page) => {
                        this.getCarsPage(page - 1);
                    }}></Pagination>
                </Grid>
            </Grid>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        cars: state.cars,
        pagination: state.pagination,
        sorting: state.sorting,
    }
}

const mapDispatchToProps = {
    setSortField: setSortField,
    setSortOrder: setSortOrder,
    fetchCarPage: fetchCarPage,
    setPage: setCurrentPage,
    resetPages: resetPagination,
}

export default connect(mapStateToProps, mapDispatchToProps)(VisibleCarList)
