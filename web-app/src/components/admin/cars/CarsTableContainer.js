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

function mapStateToProps(state) {
  return {
    cars: state.cars,
    pagination: state.cars.pagination
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

  render() {
    const cars = this.props.cars.cars;
    const pagination = this.props.pagination;

    if (
      !pagination.pages[0] ||
      pagination.pages[pagination.currentPage].fetching
    ) {
      return <CircularProgress />;
    }
    const currentCarsPage = pagination.pages[pagination.currentPage];
    const carItems = currentCarsPage.ids.map(id => cars.items[id]);
    return (
      <CarsTable
        handlePageChange={this.handleChangePage}
        handleRowsChange={this.handleChangeRowsPerPage}
        cars={carItems}
        pagination={pagination}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsTableContainer);
