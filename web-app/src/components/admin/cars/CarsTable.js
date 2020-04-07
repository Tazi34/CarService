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
import CheckIcon from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import CarActionMenu from "../../carActionMenu/CarActionMenu";

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
  console.log(props.cars);
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
              <TableCell className={classes.tableHeadRow} align="right">
                Available
              </TableCell>
              <TableCell className={classes.tableHeadRow} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map(car => (
              <TableRow hover={true} key={car.id}>
                <TableCell component="th" scope="row">
                  {car.model} {car.make}
                </TableCell>
                <TableCell className={classes.row} align="right">
                  {car.price}
                </TableCell>
                <TableCell className={classes.row} align="right">
                  {car.seats}
                </TableCell>
                <TableCell className={classes.row} align="right">
                  {car.year}
                </TableCell>
                <TableCell className={classes.row} align="right">
                  {car.licence}
                </TableCell>
                <TableCell className={classes.row} align="center">
                  {car.available ? (
                    <CheckIcon style={{ color: "green" }} />
                  ) : (
                    <CloseIcon style={{ color: "red" }} />
                  )}
                </TableCell>
                <TableCell
                  className={classes.row}
                  align="center"
                  valign={"middle"}
                >
                  <CarActionMenu />
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
