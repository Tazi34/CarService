import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCarsPage } from "../../../redux/car/carAPIrequests";
import { CircularProgress } from "@material-ui/core";

import { CarsTable } from "./CarsTable";
import {
  resetCarPagination,
  setCarCurrentPage,
  setCarPageSize
} from "../../../redux/car/carsReducer";
import { carFormPage } from "../../../utilities/urls/pages";
import Paper from "@material-ui/core/Paper";

function mapStateToProps(state) {
  return {
    cars: state.paginations.carReducer.cars,
    pagination: state.paginations.carReducer.pagination
  };
}

const mapDispatchToProps = {
  setRowsPerPage: setCarPageSize,
  fetchCarsPage: fetchCarsPage,
  setPage: setCarCurrentPage,
  resetPages: resetCarPagination
};

class CarsTableContainer extends Component {
  componentDidMount() {
    this.props.fetchCarsPage({
      pageNo: 0,
      size: this.props.pagination.pageSize
    });
  }

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

  handleAddCar = () => {
    this.props.history.push(carFormPage);
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
        <CarsTable
          title={"ACTIVE CARS"}
          addCar={this.handleAddCar}
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
