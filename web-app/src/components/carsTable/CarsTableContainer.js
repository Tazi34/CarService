import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCarsPage } from "../../redux/car/carAPIrequests";
import { CircularProgress } from "@material-ui/core";

import { CarsTable } from "./CarsTable";
import {
  resetCarPagination,
  setCarCurrentPage,
  setCarPageSize
} from "../../redux/car/carsReducer";
import Paper from "@material-ui/core/Paper";
import postCar from "../../redux/car/apiRequests/postCar";
import deleteCar from "../../redux/car/apiRequests/deleteCar";
import blockCar from "../../redux/car/apiRequests/blockCar";
import { compose } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import { withAlertMessage } from "../wrappers/withAlertMessage/withAlertMessage";
import { withLoadingSpinner } from "../wrappers/withLoadingSpinner/withLoadingSpinner";

const styles = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  root: {
    display: "flex",
    minHeight: "60vh"
  }
});

class CarsTableContainer extends Component {
  componentDidMount() {
    this.resetPagination();
  }

  handleActionError = error => {
    this.props.alertError("Error processing action.");
  };
  handleActionSuccess = message => {
    this.props.alertSuccess(message);
  };

  handlePageChange = (event, newPage) => {
    const pagination = this.props.pagination;
    //IF NOT FETCHED
    if (!pagination.pages[newPage]) {
      this.props.fetchCarsPage({
        pageNo: newPage,
        size: this.props.pagination.pageSize
      });
    }
    this.props.setPage(newPage);
  };

  handleRowsPerPageChange = event => {
    const rowsPerPage = parseInt(event.target.value, 10);
    this.props.resetPages();
    this.props.setRowsPerPage(rowsPerPage);
    this.props.fetchCarsPage({
      pageNo: 0,
      size: rowsPerPage
    });
  };

  resetPagination = () => {
    const { resetPages, fetchCarsPage, pagination } = this.props;
    resetPages();
    fetchCarsPage({
      pageNo: 0,
      size: pagination.pageSize
    });
  };

  handleAction = (action, successMessage) => {
    const { startLoading, finishLoading } = this.props;
    //open loading spinner backdrop
    startLoading();
    action()
      .then(
        () => {
          this.resetPagination();
          this.handleActionSuccess(successMessage);
        },
        error => this.handleActionError(error)
      )
      .then(() => finishLoading());
  };

  handleCarPost = car => {
    const { postCar } = this.props;
    this.handleAction(() => postCar(car), "Car added.");
  };

  handleCarBlock = (car, { startDate, endDate, comment }) => {
    const { blockCar } = this.props;
    this.handleAction(
      () => blockCar(car, { startDate, endDate, comment }),
      "Car blocked."
    );
  };

  handleCarDelete = car => {
    const { deleteCar } = this.props;
    this.handleAction(() => deleteCar(car.id), "Car deleted.");
  };

  render() {
    const { cars, pagination, classes } = this.props;

    if (
      !pagination.pages[0] ||
      pagination.pages[pagination.currentPage].fetching
    ) {
      return (
        <Paper className={classes.root}>
          <CircularProgress />
        </Paper>
      );
    }
    const currentCarsPage = pagination.pages[pagination.currentPage];
    const carItems = currentCarsPage.ids.map(id => cars[id]);

    return (
      <Paper className={classes.root}>
        <CarsTable
          title={"ACTIVE CARS"}
          addCar={this.handleCarPost}
          deleteCar={this.handleCarDelete}
          blockCar={this.handleCarBlock}
          handlePageChange={this.handlePageChange}
          handleRowsChange={this.handleRowsPerPageChange}
          cars={carItems}
          pagination={pagination}
        />
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    cars: state.paginations.carReducer.cars,
    pagination: state.paginations.carReducer.pagination
  };
}

const mapDispatchToProps = {
  deleteCar,
  postCar,
  blockCar,
  setRowsPerPage: setCarPageSize,
  fetchCarsPage: fetchCarsPage,
  setPage: setCarCurrentPage,
  resetPages: resetCarPagination
};

export default compose(
  withStyles(styles),
  withLoadingSpinner,
  withAlertMessage,
  connect(mapStateToProps, mapDispatchToProps)
)(CarsTableContainer);
