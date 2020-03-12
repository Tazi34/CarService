import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteCar, fetchCarsPage } from "../../../redux/car/carAPIrequests";
import { CircularProgress } from "@material-ui/core";

import {
  resetPagination,
  setCurrentPage,
  setPageSize
} from "../../../redux/pagination/paginationActions";

import { CarsTable } from "./CarsTable";

function CarsTableContainer(props) {
  useEffect(() => {
    props.fetchCarsPage({
      pageNo: 0,
      size: props.pagination.pageSize
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    const pagination = props.pagination;
    //IF NOT FETCHED
    if (!pagination.pages[newPage]) {
      props.fetchCarsPage({
        pageNo: newPage,
        size: props.pagination.pageSize
      });
    }
    props.setPage(newPage);
  };

  const handleDelete = id => {
    props
      .deleteCar(id)
      .then(() => {
        alert("Car deleted");
        props.resetPages();
        props.fetchCarsPage({
          pageNo: 0
        });
      })
      .catch(err => alert("Error deleting car"));
  };

  const handleChangeRowsPerPage = event => {
    const rowsPerPage = parseInt(event.target.value, 10);
    props.resetPages();
    props.setRowsPerPage(rowsPerPage);
    props.fetchCarsPage({
      pageNo: 0,
      size: rowsPerPage
    });
  };

  const cars = props.cars.cars;
  const pagination = props.pagination;
  if (
    !pagination.pages[0] ||
    pagination.pages[pagination.currentPage].fetching
  ) {
    return <CircularProgress />;
  }
  const currentCarsPage = pagination.pages[pagination.currentPage];
  const carItems = currentCarsPage.ids.map(id => cars.items[id]);
  return (
    <div>
      {selected.length > 0 && <p>{selected.length}</p>}
      <CarsTable
        handlePageChange={handleChangePage}
        handleRowsChange={handleChangeRowsPerPage}
        cars={carItems}
        pagination={pagination}
        handleDelete={handleDelete}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cars: state.cars,
    pagination: state.cars.pagination
  };
}

const mapDispatchToProps = {
  setRowsPerPage: setPageSize,
  fetchCarsPage: fetchCarsPage,
  setPage: setCurrentPage,
  resetPages: resetPagination,
  deleteCar: deleteCar
};
export default connect(mapStateToProps, mapDispatchToProps)(CarsTableContainer);
