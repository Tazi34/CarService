import { Grid, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  resetPagination,
  setCurrentPage,
  setSortField,
  setSortOrder,
  SortOrders
} from "../../redux/pagination/paginationActions";
import SortingSelectors from "../UI/SortingSelectors";
import { fetchAvailableCarsPage } from "../../redux/car/carAPIrequests";
import CarList from "./CarList";
import { SortCarsOrderFields } from "./FieldsConst";

class AvailableCarList extends Component {
  componentDidMount() {
    this.getAvailableCarsPage(0);
  }
  componentDidUpdate() {
    if (!this.props.pagination.pages[0]) this.getAvailableCarsPage(0);
  }

  getAvailableCarsPage = page => {
    var pagination = this.props.pagination;
    var sorting = this.props.sorting;
    var dateLocationInput = this.props.dateLocationInput;
    //IF NOT FETCHED
    if (!pagination.pages[page]) {
      this.props.fetchCarPage(
        page,
        sorting.field,
        sorting.order,
        dateLocationInput.startDate,
        dateLocationInput.endDate
        //TODO commented only for testing dateLocationInput.startSpot.id
      );
    }
    //IF ALREADY IN STORE
    else {
      this.props.setPage(page);
    }
  };

  getFieldSortOptions = () => {
    var options = [];
    for (var sortOption in SortCarsOrderFields) {
      var option = SortCarsOrderFields[sortOption];
      options.push(<option value={option.value}>{option.display}</option>);
    }
    return options;
  };

  sortingApplyHandler = () => {
    var sorting = this.props.sorting;
    if (sorting.field && sorting.order != SortOrders.NOT_SORTED) {
      this.props.resetPages();
    }
  };

  render() {
    var cars = this.props.cars;
    var pagination = this.props.pagination;

    if (!pagination.pages[0]) return <Typography>Loading...</Typography>;

    var currentPage = pagination.pages[pagination.currentPage];

    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        alignContent="center"
      >
        <Grid item container justify="flex-end" direction="row">
          <Grid item>
            <SortingSelectors
              fieldChanged={this.props.setSortField}
              orderChanged={this.props.setSortOrder}
              fieldOptions={this.getFieldSortOptions()}
              applyHandler={this.sortingApplyHandler}
            />
          </Grid>
        </Grid>

        <Grid item>
          <CarList cars={currentPage.ids.map(id => cars.items[id])}></CarList>
        </Grid>
        <Grid item>
          <Pagination
            count={pagination.totalPages}
            onChange={(event, page) => {
              this.getAvailableCarsPage(page - 1);
            }}
          ></Pagination>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    cars: state.cars,
    pagination: state.pagination,
    sorting: state.sorting,
    dateLocationInput: state.reservations
  };
};

const mapDispatchToProps = {
  setSortField: setSortField,
  setSortOrder: setSortOrder,
  fetchCarPage: fetchAvailableCarsPage,
  setPage: setCurrentPage,
  resetPages: resetPagination
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailableCarList);
