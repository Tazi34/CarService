import { CircularProgress, createStyles, withStyles } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAvailableCarsPage } from "../../redux/car/carAPIrequests";
import { selectCar } from "../../redux/booking/bookingActions";
import CarList from "../carList/CarList";
import { CarsSortOrderOptions } from "../availableCars/carsSortingFields";
import { compose } from "recompose";
import { reservationSummaryPage } from "../../utilities/urls/pages";
import SortingBar from "../sortingBar/SortingBar";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router";
import {
  resetCarPagination,
  setCarCurrentPage,
  setCarSortField,
  setCarSortOrder
} from "../../redux/car/carsReducer";
import { SortOrders } from "../../utilities/sortOrders";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";

const useStyles = createStyles(theme => ({
  root: {
    margin: "10px auto",
    padding: 30
  },
  pagination: {
    margin: "auto"
  }
}));

class AvailableCars extends Component {
  componentDidMount() {
    this.props.resetPages();
    this.getCarsPage(0);
  }

  componentDidUpdate() {
    if (!this.props.pagination.pages[0]) {
      this.getCarsPage(0);
    }
  }

  getCarsPage = page => {
    const {
      pagination,
      sorting,
      currentReservation,
      setPage,
      fetchCarPage
    } = this.props;
    const { field: sortByField } = sorting;
    const { startDate, endDate, startSpot } = currentReservation;
    let sortOrder = sorting.order;

    //IF ALREADY IN STORE
    if (pagination.pages[page]) {
      setPage(page);
    }
    //IF NOT FETCHED
    else {
      if (sortOrder === SortOrders.NOT_SORTED) {
        sortOrder = null;
      }
      fetchCarPage(
        page,
        sortByField,
        sortOrder,
        startDate,
        endDate,
        startSpot.id
      );
    }
  };

  handleCarSelect = car => {
    this.props.selectCar(car);
    this.props.history.push(reservationSummaryPage);
  };
  handleSortApply = () => {
    this.props.resetPages();
  };

  handlePageChange = (event, page) => {
    this.getCarsPage(page - 1);
  };

  render() {
    const {
      classes,
      cars,
      pagination,
      currentReservation,
      setSortOrder,
      setSortField
    } = this.props;

    if (!currentReservation.status.dateLocationPicked) {
      return <Redirect to={"/"} />;
    }

    const currentPage = pagination.pages[pagination.currentPage];

    if (!currentPage || currentPage.fetching) {
      return (
        <Backdrop style={{ color: "#fff" }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      );
    }

    return (
      <Paper className={classes.root}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"stretch"}
          justifyContent={"center"}
        >
          <div>
            <SortingBar
              onOrderChange={setSortOrder}
              onFieldChange={setSortField}
              onSubmit={this.handleSortApply}
              options={CarsSortOrderOptions}
            />
          </div>
          <div className={classes.carList}>
            <CarList
              onCarSelect={this.handleCarSelect}
              cars={currentPage.ids.map(id => cars[id])}
            />
          </div>
          <Pagination
            className={classes.pagination}
            count={pagination.totalPages}
            onChange={this.handlePageChange}
          />
        </Box>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    cars: state.paginations.carReducer.cars,
    pagination: state.paginations.carReducer.pagination,
    sorting: state.paginations.carReducer.pagination.sorting,
    currentReservation: state.bookingForm.reservation
  };
};

const mapDispatchToProps = {
  setSortField: setCarSortField,
  setSortOrder: setCarSortOrder,
  fetchCarPage: fetchAvailableCarsPage,
  setPage: setCarCurrentPage,
  resetPages: resetCarPagination,
  selectCar: selectCar
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(useStyles)
)(AvailableCars);
