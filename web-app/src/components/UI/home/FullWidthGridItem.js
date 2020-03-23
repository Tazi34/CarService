import React from "react";
import Grid from "@material-ui/core/Grid";

export const FullWidthGridItem = props => {
  return <Grid style={{ width: "100%" }} {...props} item></Grid>;
};
