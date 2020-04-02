import React, { Component } from "react";
import ClientDetailsForm from "./ClientDetailsForm";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { postReservationForm } from "../../redux/booking/bookingActions";
import { fetchClientDetails } from "../../redux/clientDetails/clientDetailsActions";
import { CircularProgress } from "@material-ui/core";
import { reservationsPage } from "../../utilities/urls/pages";

class ClientDetailsFormContainer extends Component {
  componentDidMount() {
    this.props.fetchClientDetails(this.props.user.email);
  }

  submitForm = async userInfo => {
    const bookingForm = this.props.bookingForm;
    const reservation = bookingForm.reservation;
    const clientDetailsFromServer = bookingForm.clientDetails.item;
    const requestReservationData = prepareData(
      userInfo,
      reservation,
      clientDetailsFromServer
    );

    const status = await this.props.postForm(requestReservationData);
    if (status === 200) this.props.history.replace(reservationsPage);
    else alert("ERROR");
  };

  render() {
    const bookingForm = this.props.bookingForm;
    const reservation = bookingForm.reservation;
    if (!reservation.car.selected) return <Redirect to="/"></Redirect>;
    if (bookingForm.clientDetails.isFetching) return <CircularProgress />;

    return (
      <ClientDetailsForm
        onSubmit={this.submitForm}
        email={this.props.user.email}
        clientDetails={bookingForm.clientDetails.item}
      ></ClientDetailsForm>
    );
  }
}

const mapStateToProps = state => ({
  bookingForm: state.bookingForm,
  isAuthenticated: state.authentication.isAuthenticated,
  user: state.authentication.user
});

const mapDispatchToProps = {
  postForm: postReservationForm,
  fetchClientDetails: fetchClientDetails
};

const prepareData = (userInfo, reservation, clientDetailsFromServer) => {
  let requestReservationData = {
    carId: reservation.car.item.id,
    startSpotId: reservation.startSpot.id,
    endSpotId: reservation.endSpot.id,
    clientInfo: {
      id: userInfo.id,
      name: userInfo.firstName,
      surname: userInfo.lastName,
      email: userInfo.email,
      pid: userInfo.pid,
      phoneNumber: userInfo.phoneNumber,
      address: {
        city: userInfo.city,
        postalCode: userInfo.postalCode,
        country: userInfo.country,
        street: userInfo.street,
        houseNumber: userInfo.houseNumber
      }
    },
    priceTotal: reservation.totalPrice.price,
    fromDate: reservation.startDate,
    toDate: reservation.endDate
  };

  if (clientDetailsFromServer) {
    requestReservationData.clientInfo.address.id =
      clientDetailsFromServer.address.id;
    requestReservationData.clientInfo.id = clientDetailsFromServer.id;
  }
  return requestReservationData;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientDetailsFormContainer);
