import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCarsPage } from "../../../redux/car/carAPIrequests";
import { CircularProgress, TableBody, TableContainer } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { compose } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import {
  resetPagination,
  setCurrentPage,
  setPageSize
} from "../../../redux/pagination/paginationActions";

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
  resetPages: resetPagination
};
const styles = theme => ({
  table: {
    minWidth: 650
  },
  tableHeadRow: {
    fontWeight: 900
  }
});

class CarsTable extends Component {
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
    const { classes } = this.props;
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
      <div>
        <Paper>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadRow}>Car</TableCell>
                  <TableCell className={classes.tableHeadRow} align="right">
                    Price &nbsp;(per day)
                  </TableCell>
                  <TableCell className={classes.tableHeadRow} align="right">
                    Seats
                  </TableCell>
                  <TableCell className={classes.tableHeadRow} align="right">
                    Year
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carItems.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.model} {row.make}
                    </TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.seats}</TableCell>
                    <TableCell align="right">{row.year}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              l
            </Table>
          </TableContainer>
          <TablePagination
            // rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={pagination.totalElements}
            rowsPerPage={pagination.pageSize}
            page={pagination.currentPage}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CarsTable);
