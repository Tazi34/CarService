import { CircularProgress } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAvailableCarsPage } from "../../redux/car/carAPIrequests";
import {
  resetPagination,
  setCurrentPage,
  setSortField,
  setSortOrder
} from "../../redux/pagination/paginationActions";
import { selectCar } from "../../redux/bookingForm/bookingFormActions";
import SortingPanel from "../UI/SortingPanel";
import CarList from "./CarList";
import { SortCarsOrderFields } from "./FieldsConst";

class AvailableCarList extends Component {
  componentDidMount() {
    this.getAvailableCarsPage(0);
  }

  componentDidUpdate() {
    if (!this.props.pagination.pages[0]) this.getAvailableCarsPage(0);
  }

  carSelectionHandler = car => {
    if (this.props.authenticated) {
      this.props.selectCar(car);
      this.props.history.push(`/cars/apply/${car.id}`);
    } else this.props.history.push("/login");
  };
  getAvailableCarsPage = page => {
    var pagination = this.props.pagination;
    var sorting = this.props.sorting;
    var currentReservation = this.props.currentReservation;
    //IF NOT FETCHED
    if (!pagination.pages[page]) {
      this.props.fetchCarPage(
        page,
        sorting.field,
        sorting.order,
        currentReservation.startDate,
        currentReservation.endDate

        //currentReservation.startSpot.id
        //TODO commented only for testing currentReservation.startSpot.id
      );
    }
    //IF ALREADY IN STORE
    else {
      this.props.setPage(page);
    }
  };

  getFieldSortOptions = () => {
    let options = [];
    let i = 0;
    for (let sortOption in SortCarsOrderFields) {
      let option = SortCarsOrderFields[sortOption];
      options.push(
        <option key={i++} value={option.value}>
          {option.display}
        </option>
      );
    }
    return options;
  };

  sortingApplyHandler = () => {
    this.props.resetPages();
  };

  render() {
    //TODO Only for testing
    // if (!this.props.currentReservation.status.dateLocationPicked)
    //   return <Redirect to="/"></Redirect>;
    const cars = this.props.cars;
    const pagination = this.props.pagination;
    //TODO redirect if date and location not selected
    if (
      !pagination.pages[0] ||
      pagination.pages[pagination.currentPage].fetching
    ) {
      return <CircularProgress />;
    }

    const currentPage = pagination.pages[pagination.currentPage];

    return (
      <div style={{ width: "80%", margin: "auto" }}>
        <SortingPanel
          fieldChanged={this.props.setSortField}
          orderChanged={this.props.setSortOrder}
          fieldOptions={this.getFieldSortOptions()}
          applyHandler={this.sortingApplyHandler}
          buttonDisabled={false}
        />
        <CarList
          carSelectionHandler={this.carSelectionHandler}
          cars={currentPage.ids.map(id => cars.items[id])}
        ></CarList>
        <Pagination
          count={pagination.totalPages}
          onChange={(event, page) => {
            this.getAvailableCarsPage(page - 1);
          }}
        ></Pagination>
      </div>
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
  setSortField: setSortField,
  setSortOrder: setSortOrder,
  fetchCarPage: fetchAvailableCarsPage,
  setPage: setCurrentPage,
  resetPages: resetPagination,
  selectCar: selectCar
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailableCarList);
