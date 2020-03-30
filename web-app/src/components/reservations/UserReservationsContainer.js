import React, { Component } from "react";
import { connect } from "react-redux";
import {
  cancelReservation,
  fetchUsersReservations
} from "../../redux/reservations/reservationsActions";
import { ReservationsTable } from "./reservationsTable/ReservationsTable";

class UserReservationsContainer extends Component {
  componentDidMount() {
    this.props.fetchReservations(this.props.user.email);
  }

  render() {
    const reservations = this.props.reservations;
    const items = reservations.byId.map(id => reservations.items[id]);
    if (!reservations.fetched) return null;
    return (
      <ReservationsTable
        title={"Your recent reservations"}
        reservations={items}
      />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReservationsContainer);
