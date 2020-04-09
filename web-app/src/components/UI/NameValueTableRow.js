import React from "react";
import { TableCell, TableRow } from "@material-ui/core";

export const NameValueTableRow = ({ name, value, ...props }) => {
  return (
    <TableRow {...props}>
      <TableCell align={"left"}>{name}</TableCell>
      <TableCell align={"right"}>{value}</TableCell>
    </TableRow>
  );
};
