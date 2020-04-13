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

  handleSubmit = async userInfo => {
    const { bookingForm, postForm, history } = this.props;
    const { reservation } = bookingForm;
    const clientDetailsFromServer = bookingForm.clientDetails.item;
    const requestReservationData = prepareData(
      userInfo,
      reservation,
      clientDetailsFromServer
    );

    const status = await postForm(requestReservationData);

    if (status === 200) {
      this.props.alertSuccess("Car booked.");
      history.replace(reservationsPage);
    } else {
      this.props.alertError("Error while processing your request");
    }
  };

  render() {
    console.log(this.props);
    const { bookingForm, user } = this.props;
    const { reservation } = bookingForm;
    if (!reservation.car.selected) {
      return <Redirect to="/" />;
    }

    if (bookingForm.clientDetails.isFetching) {
      return <CircularProgress />;
    }

    return (
      <ClientDetailsForm
        onSubmit={this.handleSubmit}
        email={user.email}
        clientDetails={bookingForm.clientDetails.item}
      />
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
