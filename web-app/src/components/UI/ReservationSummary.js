import React from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    car: state.bookingForm.reservation.car
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const ReservationSummary = props => {
  const car = props.car;

  return <div></div>;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(ReservationSummary);
