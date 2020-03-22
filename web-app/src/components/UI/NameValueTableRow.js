import React from "react";
import { TableCell, TableRow } from "@material-ui/core";

export const NameValueTableRow = props => {
  return (
    <TableRow>
      <TableCell align={"left"}>{props.name}</TableCell>
      <TableCell align={"right"}>{props.value}</TableCell>
    </TableRow>
  );
};
