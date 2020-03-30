import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  root: {
    margin: "10px auto",
    backgroundColor: "#f4f4f4",
    textAlign: "center"
  }
});

export function LocationSummary(props) {
  const classes = useStyles();
  //TODO provide data from props
  const formattedDate = "Friday 20 Aug, 15:30";
  const formattedLocation = "al.Jerozolimskie 53, Warszawa";
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography component="h6" variant="h6" className={classes.title}>
          <Box color={"secondary.main"}>{props.title}</Box>
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
