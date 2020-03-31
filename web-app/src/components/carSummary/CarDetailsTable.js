import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Table from "@material-ui/core/Table";
import { TableBody, TableContainer } from "@material-ui/core";
import { NameValueTableRow } from "../UI/NameValueTableRow";

const useStyles = makeStyles({
  root: {
    padding: 10
  }
});

export const CarDetailsTable = props => {
  const classes = useStyles();
  const car = props.car;
  return (
    <TableContainer className={classes.root}>
      <Table>
        <TableBody>
          <NameValueTableRow name={"Car"} value={`${car.make} ${car.model}`} />
          <NameValueTableRow name={"Seats"} value={car.seats} />
          <NameValueTableRow name={"Doors"} value={car.doors} />
          <NameValueTableRow name={"Year"} value={car.year} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};
