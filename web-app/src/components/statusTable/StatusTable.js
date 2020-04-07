// @flow
import * as React from "react";
import { TableBody, TableContainer, useTheme } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";

const styles = makeStyles(theme => ({
  table: {
    minWidth: 0,
    flex: 1,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
    padding: "20px 40px 15px 30px",
    borderRadius: 20,
    [theme.breakpoints.down("sm")]: {
      padding: 10
    }
  },
  tableHeadRow: {
    fontWeight: 900
  },
  row: {
    padding: 3
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const cellPadding = isMobile ? "none" : "default";
  const dateFormat = isMobile ? "DD.MM" : "DD.MM.YY";
  const renderStatus = status => {
    const { dateFrom, dateTo, car, type } = status;

    return (
      <TableRow hover={true} key={status.id}>
        <TableCell padding={cellPadding} align="left" className={classes.row}>
          {isMobile ? car.licence : `${car.model} ${car.make}`}
        </TableCell>
        <TableCell padding={cellPadding} align="center" className={classes.row}>
          {moment(dateFrom).format(dateFormat)}
        </TableCell>
        <TableCell padding={cellPadding} align="center" className={classes.row}>
          {moment(dateTo).format(dateFormat)}
        </TableCell>

        <TableCell padding={cellPadding} align="right" className={classes.row}>
          {formatStatusType(type)}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className={classes.table}>
      <TableContainer>
        <Typography
          color={"primary"}
          variant={"h4"}
          align={"center"}
          className={classes.title}
        >
          {props.title}
        </Typography>
        <Table size={isMobile ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              <TableCell
                padding={cellPadding}
                className={classes.tableHeadRow}
                align="lefts"
              >
                Car
              </TableCell>
              <TableCell
                padding={cellPadding}
                className={classes.tableHeadRow}
                align="center"
              >
                Start
              </TableCell>
              <TableCell
                padding={cellPadding}
                className={classes.tableHeadRow}
                align="center"
              >
                End
              </TableCell>
              <TableCell
                padding={cellPadding}
                className={classes.tableHeadRow}
                align="right"
              >
                Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{statusItems.map(renderStatus)}</TableBody>
        </Table>
      </TableContainer>
      <Box
        display={"flex"}
        justifyContent={isMobile ? "center" : "space-between"}
        alignItems={"center"}
      >
        {isMobile ? (
          <Pagination
            size={"small"}
            count={pagination.totalPages}
            page={pagination.currentPage}
            onChange={props.handlePageChange}
            style={{ margin: "auto" }}
            siblingCount={0}
            boundaryCount={1}
          />
        ) : (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={pagination.totalElements}
            rowsPerPage={pagination.pageSize}
            page={pagination.currentPage}
            onChangePage={props.handlePageChange}
            onChangeRowsPerPage={props.handleRowsChange}
          />
        )}
      </Box>
    </div>
  );
}
