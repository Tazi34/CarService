import React from "react";
import Table from "@material-ui/core/Table";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#f4f4f4"
  },
  totalCostText: {
    fontWeight: "600",
    color: "black"
  }
});

export const PriceSummary = props => {
  const classes = useStyles();
  const days = 5;
  //TODO provide data in props
  const rows = [
    { name: `Car (${days} days)`, formattedPrice: "200.00 PLN" },
    { name: "Tax and Fees", formattedPrice: "120.00 PLN" },
    { name: "Insurance Add on", formattedPrice: "30.00 PLN" }
  ];
  const sum = "350.00 PLN";
  return (
    <TableContainer className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align={"left"}>
              <Box color={"secondary.main"}>Item description</Box>
            </TableCell>
            <TableCell align={"right"}>
              <Box color={"secondary.main"}>Price</Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell align={"left"}>{row.name}</TableCell>
              <TableCell align={"right"}>{row.formattedPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className={classes.footer}>
          <TableRow>
            <TableCell align={"left"}>
              <Typography variant={"body2"} className={classes.totalCostText}>
                Total Cost
              </Typography>
            </TableCell>
            <TableCell align={"right"}>
              <Typography variant={"h6"}>
                <Box color={"primary.main"}>{sum}</Box>
              </Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
