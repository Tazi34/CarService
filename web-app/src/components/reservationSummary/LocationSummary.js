import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    margin: "10px auto",
    backgroundColor: "#f4f4f4",
    textAlign: "center"
  }
});

export function LocationSummary({ date, location, title, ...props }) {
  const classes = useStyles();

  const formattedDate = moment(date).format("MMMM Do YYYY");
  const formattedLocation = `${location.spot}, ${location.city}`;

  return (
    <Card className={classes.root} {...props}>
      <CardContent>
        <Typography component="h6" variant="h6" className={classes.title}>
          <Box color={"secondary.main"}>{title}</Box>
        </Typography>

        <Typography variant={"body1"} color={"textPrimary"} component={"p"}>
          {formattedDate}
        </Typography>

        <Typography variant={"body2"} color={"textPrimary"} component={"p"}>
          {formattedLocation}
        </Typography>
      </CardContent>
    </Card>
  );
}
