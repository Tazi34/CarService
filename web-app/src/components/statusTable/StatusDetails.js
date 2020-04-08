import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export const StatusDetails = props => {
  const { status } = props;
  const { clientInfo, startSpot, endSpot } = status;
  return (
    <Grid container>
      {clientInfo && (
        <Grid item xs={6} display={"flex"} flexDirection={"column"}>
          <Typography color={"primary"}>Client:</Typography>
          <div>
            {clientInfo.name} {clientInfo.surname}
          </div>
          <div> {clientInfo.email}</div>
        </Grid>
      )}
      {startSpot && endSpot && (
        <Grid item xs={6}>
          <Typography color={"primary"}>Location:</Typography>
          <div>
            {startSpot.name} - {endSpot.name}
          </div>
        </Grid>
      )}

      {status.comment && (
        <Grid item xs={12}>
          <Typography color={"primary"}>Description:</Typography>
          <Typography variant={"body"}>{status.comment}</Typography>
        </Grid>
      )}
    </Grid>
  );
};
