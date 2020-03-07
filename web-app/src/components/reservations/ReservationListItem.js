// @flow
import * as React from "react";
import { ListItemText } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  listItem: {
    height: "150px",
    border: "solid 5px black"
  },
  canceled: {
    background: "grey"
  },
  active: {
    background: "green"
  },
  root: {
    background:
      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(2,1,41,1) 15%, rgba(0,0,179,1) 43%, rgba(0,212,255,1) 100%)",
    borderRadius: 3,
    border: 10,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  }
});

export function ReservationListItem(props) {
  const classes = useStyles();
  return (
    <ListItem
      classes={{
        root: classes.root
      }}
    >
      <ListItemText>
        {props.item.id}. {props.item.car.make} {props.item.car.model}
      </ListItemText>
      <Button onClick={() => props.deleteReservation(props.item.id)}>
        DELETE
      </Button>
    </ListItem>
  );
}
