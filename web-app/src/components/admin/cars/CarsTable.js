// @flow
import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { TableBody, TableContainer } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  table: {
    minWidth: 650
  },
  tableHeadRow: {
    fontWeight: 900
  }
}));

export function CarsTable(props) {
  const classes = styles();

  const carItems = props.cars;
  const pagination = props.pagination;
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pagination.totalElements}
          rowsPerPage={pagination.pageSize}
          page={pagination.currentPage}
          onChangePage={props.handlePageChange}
          onChangeRowsPerPage={props.handleRowsChange}
        />
      </Paper>
    </div>
  );
}
