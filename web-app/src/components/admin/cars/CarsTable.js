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

function mapStateToProps(state) {
  return {
    cars: state.cars
  };
}

const mapDispatchToProps = {
  fetchCarsPage: fetchCarsPage
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
    this.props.fetchCarsPage(0);
  }

  render() {
    const { classes } = this.props;
    const cars = this.props.cars.cars;
    if (cars.isFetching) return <CircularProgress />;
    const carItems = cars.byId.map(id => cars.items[id]);
    return (
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
        </Table>
      </TableContainer>
    );
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CarsTable);
