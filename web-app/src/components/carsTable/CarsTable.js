import * as React from "react";
import { TableBody, TableContainer } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import CheckIcon from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import CarActionMenu from "../carActionMenu/CarActionMenu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import Pagination from "@material-ui/lab/Pagination";
import { CarFormOpenButton } from "../carFormDialog/CarFormOpenButton";

const styles = makeStyles(theme => ({
  table: {
    flex: 1,
    minWidth: 0,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
    padding: "20px 40px 15px 30px",
    borderRadius: 20,
    [theme.breakpoints.down("sm")]: {
      padding: 10
    }
  },
  tableHeadCell: {
    fontWeight: 900
  },
  availableRow: {
    backgroundColor: "rgba(99, 191, 63, 0.25)"
  },
  unavailableRow: {
    backgroundColor: "rgba(255, 0, 0, 0.13)"
  }
}));

export function CarsTable(props) {
  const classes = styles();
  const { pagination, cars, title, deleteCar, blockCar } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderDesktopTableHeadRow = () => {
    return (
      <TableRow>
        <TableCell className={classes.tableHeadCell}>Car</TableCell>
        <TableCell className={classes.tableHeadCell} align="right">
          Price &nbsp;(per day)
        </TableCell>
        <TableCell className={classes.tableHeadCell} align="right">
          Seats
        </TableCell>
        <TableCell className={classes.tableHeadCell} align="right">
          Year
        </TableCell>
        <TableCell className={classes.tableHeadCell} align="right">
          Licence
        </TableCell>
        <TableCell className={classes.tableHeadCell} align="right">
          Available
        </TableCell>
        <TableCell className={classes.tableHeadCell} align="center">
          Action
        </TableCell>
      </TableRow>
    );
  };

  const renderDesktopTableRow = car => {
    return (
      <TableRow hover={true} key={car.id}>
        <TableCell component="th" scope="row">
          {car.model} {car.make}
        </TableCell>
        <TableCell align="right">{car.price}</TableCell>
        <TableCell align="right">{car.seats}</TableCell>
        <TableCell align="right">{car.year}</TableCell>
        <TableCell align="right">{car.licence}</TableCell>
        <TableCell align="center">
          {car.available ? (
            <CheckIcon style={{ color: "green" }} />
          ) : (
            <CloseIcon style={{ color: "red" }} />
          )}
        </TableCell>
        <TableCell className={classes.row} align="center" valign={"middle"}>
          <CarActionMenu car={car} blockCar={blockCar} deleteCar={deleteCar} />
        </TableCell>
      </TableRow>
    );
  };
  const renderMobileTableHeadRow = () => {
    return (
      <TableRow>
        <TableCell padding={"none"} className={classes.tableHeadRow}>
          <div style={{ paddingLeft: 5 }}>Car</div>
        </TableCell>
        <TableCell
          padding={"none"}
          className={classes.tableHeadRow}
          align="center"
        >
          Licence
        </TableCell>
        <TableCell
          padding={"none"}
          className={classes.tableHeadRow}
          align="center"
        >
          Action
        </TableCell>
      </TableRow>
    );
  };
  const renderMobileTableRow = car => {
    const styling = car.available
      ? classes.availableRow
      : classes.unavailableRow;

    return (
      <TableRow key={car.id} className={styling}>
        <TableCell padding={"none"} component="th" scope="row">
          <div style={{ paddingLeft: 5 }}>
            {car.model} {car.make}
          </div>
        </TableCell>
        <TableCell padding={"none"} align="center">
          {car.licence}
        </TableCell>

        <TableCell padding={"none"} align="center" valign={"middle"}>
          <CarActionMenu car={car} blockCar={blockCar} deleteCar={deleteCar} />
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className={classes.table}>
      <TableContainer>
        <Typography variant={"h5"} align={"center"} color={"primary"}>
          {title}
        </Typography>
        <Table size={"small"}>
          <TableHead>
            {isMobile
              ? renderMobileTableHeadRow()
              : renderDesktopTableHeadRow()}
          </TableHead>
          <TableBody>
            {cars.map(car =>
              isMobile ? renderMobileTableRow(car) : renderDesktopTableRow(car)
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        display={"flex"}
        justifyContent={isMobile ? "center" : "space-between"}
        alignItems={"center"}
      >
        {!isMobile && <CarFormOpenButton onSubmit={props.addCar} />}

        {isMobile ? (
          <Pagination
            size={"small"}
            count={pagination.totalPages}
            page={pagination.currentPage}
            onChange={props.handlePageChange}
            siblingCount={0}
            boundaryCount={1}
          />
        ) : (
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={pagination.totalElements}
            rowsPerPage={pagination.pageSize}
            page={pagination.currentPage}
            onChangePage={props.handlePageChange}
            onChangeRowsPerPage={props.handleRowsChange}
            labelRowsPerPage={""}
          />
        )}
      </Box>
    </div>
  );
}
