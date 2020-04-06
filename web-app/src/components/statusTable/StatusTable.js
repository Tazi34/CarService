// @flow
import * as React from "react";
import { TableBody, TableContainer } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const styles = makeStyles(theme => ({
  table: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 20
  },
  tableHeadRow: {
    fontWeight: 900,
    width: "150px"
  },
  row: {
    width: "150px"
  }
}));

const formatStatusType = statusType => {
  switch (statusType) {
    case "BOOKINGCANCELED":
      return "canceled";
    case "BOOKED":
      return "booked";
    case "UNAVAILABLE":
      return "unavailable";
  }
};

export function StatusTable(props) {
  const classes = styles();

  const statusItems = props.statuses;
  const pagination = props.pagination;

  const renderStatus = status => {
    const { dateFrom, dateTo, car, type } = status;

    return (
      <TableRow key={status.id}>
        <TableCell align="left" className={classes.row}>
          {car.model} {car.make}
        </TableCell>
        <TableCell align="right" className={classes.row}>
          {moment(dateFrom).format("DD.MM.YY")}
        </TableCell>
        <TableCell align="right" className={classes.row}>
          {moment(dateTo).format("DD.MM.YY")}
        </TableCell>

        <TableCell align="right" className={classes.row}>
          {formatStatusType(type)}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className={classes.table}>
      <TableContainer>
        <Table size={"small"}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadRow} align="lefts">
                Car
              </TableCell>
              <TableCell className={classes.tableHeadRow} align="right">
                Start
              </TableCell>
              <TableCell className={classes.tableHeadRow} align="right">
                End
              </TableCell>
              <TableCell className={classes.tableHeadRow} align="right">
                Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{statusItems.map(renderStatus)}</TableBody>
        </Table>
      </TableContainer>
      <div style={{ flexGrow: 1 }} />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={pagination.totalElements}
        rowsPerPage={pagination.pageSize}
        page={pagination.currentPage}
        onChangePage={props.handlePageChange}
        onChangeRowsPerPage={props.handleRowsChange}
      />
    </div>
  );
}
