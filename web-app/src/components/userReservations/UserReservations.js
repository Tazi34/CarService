import React, { Component } from "react";
import { connect } from "react-redux";
import {
  cancelReservation,
  fetchUsersReservations
} from "../../redux/reservations/reservationsActions";
import { ReservationsTable } from "../reservationsTable/ReservationsTable";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { compose } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: {
    padding: "20px 10px",
    border: "1px solid black",
    minHeight: "100vh",
    maxWidth: "1000px",
    margin: "auto"
  }
});

class UserReservations extends Component {
  componentDidMount() {
    this.props.fetchReservations(this.props.user.email);
  }

  render() {
    const { reservations, classes } = this.props;
    if (!reservations.fetched) {
      return null;
    }
    const items = reservations.byId.map(id => reservations.items[id]);

    return (
      <Paper className={classes.root}>
        <Typography
          color={"primary"}
          variant={"h4"}
          align={"center"}
          noWrap={false}
        >
          Your recent reservations
        </Typography>
        <ReservationsTable
          title={"Your recent Reservations"}
          reservations={items}
        />
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    user: state.authentication.user,
    reservations: state.reservations.reservations
  };
};

const mapDispatchToProps = {
  fetchReservations: fetchUsersReservations,
  cancelReservation: cancelReservation
};

export default compose(
  withStyles(styles, { name: "Reservation" }),
  connect(mapStateToProps, mapDispatchToProps)
)(UserReservations);
