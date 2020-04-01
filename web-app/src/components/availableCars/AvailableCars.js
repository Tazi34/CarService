import { CircularProgress, createStyles, withStyles } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAvailableCarsPage } from "../../redux/car/carAPIrequests";
import {
  resetPagination,
  setCurrentPage
} from "../../redux/pagination/paginationActions";
import { selectCar } from "../../redux/booking/bookingActions";
import CarList from "../carList/CarList";
import { CarsSortOrderOptions } from "../availableCars/carsSortingFields";
import { compose } from "recompose";
import { reservationSummaryPage } from "../../utilities/urls/pages";
import SortingBar from "../sortingBar/SortingBar";
import Paper from "@material-ui/core/Paper";

const useStyles = createStyles(theme => ({
  root: {
    margin: "10px auto"
  },
  image: {
    minHeight: "300px",
    height: "auto"
  }
}));

class AvailableCars extends Component {
  componentDidMount() {
    this.getAvailableCarsPage(0);
  }

  componentDidUpdate() {
    if (!this.props.pagination.pages[0]) this.getAvailableCarsPage(0);
  }

  getAvailableCarsPage = page => {
    const {
      pagination,
      sorting,
      currentReservation,
      setPage,
      fetchCarPage
    } = this.props;
    const { field: sortByField, order: sortOrder } = sorting;
    const { startDate, endDate } = currentReservation;
    //IF NOT FETCHED
    if (!pagination.pages[page]) {
      fetchCarPage(page, sortByField, sortOrder, startDate, endDate);
    }
    //IF ALREADY IN STORE
    else {
      setPage(page);
    }
  };

  carSelectionHandler = car => {
    this.props.selectCar(car);
    this.props.history.push(reservationSummaryPage);
  };
  sortingApplyHandler = () => {
    this.props.resetPages();
  };

  render() {
    const { classes, cars, pagination, currentReservation } = this.props;

    // if (currentReservation.status.dateLocationPicked) {
    //   return <Redirect to="/"></Redirect>;
    // }

    if (
      !pagination.pages[0] ||
      pagination.pages[pagination.currentPage].fetching
    ) {
      return <CircularProgress />;
    }

    const currentPage = pagination.pages[pagination.currentPage];

    return (
      <Paper className={classes.root}>
        <SortingBar
          onSubmit={this.sortingApplyHandler}
          options={CarsSortOrderOptions}
        ></SortingBar>
        <CarList
          handleCarSelect={this.carSelectionHandler}
          cars={currentPage.ids.map(id => cars.items[id])}
        ></CarList>
        <Pagination
          count={pagination.totalPages}
          onChange={(event, page) => {
            this.getAvailableCarsPage(page - 1);
          }}
        ></Pagination>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    cars: state.cars.cars,
    pagination: state.cars.pagination,
    sorting: state.cars.pagination.sorting,
    currentReservation: state.bookingForm.reservation,
    authenticated: state.authentication.isAuthenticated
  };
};

const mapDispatchToProps = {
  fetchCarPage: fetchAvailableCarsPage,
  setPage: setCurrentPage,
  resetPages: resetPagination,
  selectCar: selectCar
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(useStyles)
)(AvailableCars);
