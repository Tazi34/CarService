import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export const StatusDetails = ({ status, ...props }) => {
  const { clientInfo, startSpot, endSpot } = status;
  return (
    <Grid container {...props}>
      {clientInfo && (
        <Grid item xs={6}>
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
          <Typography variant={"body1"}>{status.comment}</Typography>
        </Grid>
      )}
    </Grid>
  );
};
