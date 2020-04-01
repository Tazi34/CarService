import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBookingPrice } from "../../../redux/booking/priceActions";
import { CircularProgress } from "@material-ui/core";
import ReservationSummary from "./ReservationSummary";
import { Redirect } from "react-router";

function mapStateToProps(state) {
  return {
    reservationData: state.bookingForm.reservation
  };
}

const mapDispatchToProps = {
  fetchReservationTotalPrice: fetchBookingPrice
};

class ReservationSummaryContainer extends Component {
  componentDidMount() {
    const { car, startDate, endDate } = this.props.reservationData;
    this.props.fetchReservationTotalPrice(car.item.id, startDate, endDate);
  }

  render() {
    const { reservationData } = this.props;
    if (
      !reservationData.status.dateLocationPicked ||
      !reservationData.car.selected
    ) {
      return <Redirect to={"/"} />;
    }
    const { fetching: priceFetching, error } = reservationData.totalPrice;
    if (priceFetching || error) {
      return <CircularProgress />;
    }
    return <ReservationSummary reservation={reservationData} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReservationSummaryContainer);
