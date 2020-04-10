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
import Dialog from "@material-ui/core/Dialog";
import postCar from "../../redux/car/apiRequests/postCar";
import { CarForm } from "../carForm/CarForm";
import deleteCar from "../../redux/car/apiRequests/deleteCar";
import blockCar from "../../redux/car/apiRequests/blockCar";

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

class CarsTableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formDialog: false
    };
  }

  componentDidMount() {
    this.resetPagination();
  }

  setFormDialog = open => {
    this.setState({ formDialog: open });
  };

  handleChangePage = (event, newPage) => {
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

  handleChangeRowsPerPage = event => {
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

  handlePostFormSubmission = car => {
    const { postCar } = this.props;
    postCar(car).then(
      () => {
        alert("success");
        this.setFormDialog(false);
        this.resetPagination();
      },
      error => alert("ERROR")
    );
  };

  handleBlockFormSubmission = (car, { startDate, endDate, comment }) => {
    const { blockCar } = this.props;
    blockCar(car, startDate, endDate, comment).then(
      () => {
        alert("success");
        this.resetPagination();
      },
      error => alert("ERROR")
    );
  };

  handleCarDeletion = car => {
    const { deleteCar } = this.props;
    deleteCar(car.id).then(
      () => {
        alert("success");
        this.resetPagination();
      },
      error => alert("ERROR")
    );
  };

  render() {
    const cars = this.props.cars;
    const pagination = this.props.pagination;

    if (
      !pagination.pages[0] ||
      pagination.pages[pagination.currentPage].fetching
    ) {
      return (
        <Paper style={{ display: "flex", minHeight: "70vh" }}>
          <CircularProgress />
        </Paper>
      );
    }
    const currentCarsPage = pagination.pages[pagination.currentPage];
    const carItems = currentCarsPage.ids.map(id => cars[id]);
    return (
      <Paper style={{ display: "flex", minHeight: "60vh" }}>
        <Dialog
          onClose={() => this.setFormDialog(false)}
          open={this.state.formDialog}
        >
          <CarForm
            onSubmit={this.handlePostFormSubmission}
            onBack={() => this.setFormDialog(false)}
          />
        </Dialog>

        <CarsTable
          title={"ACTIVE CARS"}
          addCar={() => this.setFormDialog(true)}
          deleteCar={this.handleCarDeletion}
          blockCar={this.handleBlockFormSubmission}
          handlePageChange={this.handleChangePage}
          handleRowsChange={this.handleChangeRowsPerPage}
          cars={carItems}
          pagination={pagination}
        />
      </Paper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsTableContainer);
