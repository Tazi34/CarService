import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import { StatusDetails } from "./StatusDetails";
import Divider from "@material-ui/core/Divider";

const styles = makeStyles(theme => ({
  table: {
    minWidth: 0,
    flex: 1,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
    padding: "20px 40px 15px 30px",
    borderRadius: 20,
    [theme.breakpoints.down("sm")]: {
      padding: 10
    }
  },
  tableHeadRow: {
    fontWeight: 900
  },
  row: {
    padding: 3
  }
}));

const formatStatusType = statusType => {
  switch (statusType) {
    case "BOOKINGCANCELED":
      return "canceled";
    case "BOOKED":
      return "booked";
    case "UNAVAILABLE":
      return "unavailable";
  }
};

export const StatusRow = props => {
  const { status, mobile } = props;
  const { dateFrom, dateTo, car, type } = status;
  const classes = styles();
  const cellPadding = mobile ? "none" : "default";
  const dateFormat = mobile ? "DD.MM" : "DD.MM.YY";

  const renderDates = () => {
    return !mobile ? (
      <>
        <Grid sm={2} xs={6} item padding={cellPadding} className={classes.cell}>
          {moment(dateFrom).format(dateFormat)}
        </Grid>
        <Grid item xs={6} sm={2} padding={cellPadding} className={classes.cell}>
          {moment(dateTo).format(dateFormat)}
        </Grid>
      </>
    ) : (
      <Grid
        xs={12}
        item
        padding={cellPadding}
        className={classes.cell}
        align={"center"}
      >
        {moment(dateFrom).format(dateFormat)} -{" "}
        {moment(dateTo).format(dateFormat)}
      </Grid>
    );
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container alignContent={"center"}>
          <Grid
            sm={5}
            xs={12}
            item
            className={classes.cell}
            align={mobile ? "center" : "left"}
          >
            {mobile
              ? `${car.model} ${car.licence}`
              : `${car.make} ${car.model}`}
          </Grid>
          {renderDates()}

          <Grid
            item
            sm={2}
            xs={12}
            className={classes.cell}
            align={mobile ? "center" : "right"}
          >
            {formatStatusType(type)}
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <Divider />
      <ExpansionPanelDetails style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
        <StatusDetails status={status} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
