// @flow
import * as React from "react";
import { TableBody, TableContainer } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import AddBoxIcon from "@material-ui/icons/AddBox";
import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";

import Typography from "@material-ui/core/Typography";

const styles = makeStyles(theme => ({
  table: {
    flex: 1,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
    padding: "20px 40px 15px 30px",
    borderRadius: 20
  },
  tableHeadRow: {
    fontWeight: 900
  },
  row: {}
}));

export function CarsTable(props) {
  const classes = styles();

  const { pagination, cars, title } = props;

  return (
    <div className={classes.table}>
      <TableContainer>
        <Typography variant={"h5"} align={"center"} color={"primary"}>
          {title}
        </Typography>
        <Table size={"small"}>
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
              <TableCell className={classes.tableHeadRow} align="right">
                Licence
              </TableCell>
              <TableCell className={classes.tableHeadRow} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map(row => (
              <TableRow hover={true} key={row.id}>
                <TableCell component="th" scope="row">
                  {row.model} {row.make}
                </TableCell>
                <TableCell className={classes.row} align="right">
                  {row.price}
                </TableCell>
                <TableCell className={classes.row} align="right">
                  {row.seats}
                </TableCell>
                <TableCell className={classes.row} align="right">
                  {row.year}
                </TableCell>
                <TableCell className={classes.row} align="right">
                  {row.licence}
                </TableCell>
                <TableCell
                  className={classes.row}
                  align="center"
                  valign={"middle"}
                >
                  <BlockIcon
                    style={{ marginTop: 6, marginRight: 3 }}
                    fontSize={"small"}
                  />
                  <DeleteIcon
                    style={{ marginTop: 6, marginRight: 3 }}
                    fontSize={"small"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <AddBoxIcon
          color={"primary"}
          fontSize={"large"}
          onClick={props.addCar}
        />

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pagination.totalElements}
          rowsPerPage={pagination.pageSize}
          page={pagination.currentPage}
          onChangePage={props.handlePageChange}
          onChangeRowsPerPage={props.handleRowsChange}
        />
      </Box>
    </div>
  );
}
