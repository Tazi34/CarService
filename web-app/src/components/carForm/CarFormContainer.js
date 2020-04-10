import React, { Component } from "react";
import postCar from "../../redux/car/apiRequests/postCar";
import { connect } from "react-redux";
import { CarForm } from "./CarForm";
import { adminCarsPage } from "../../utilities/urls/pages";

class CarFormContainer extends Component {
  handleSuccess = () => {
    this.props.history.push(adminCarsPage);
  };

  handleError = () => {
    alert("Error");
  };

  handleSubmit = car => {
    this.props.postCar(car).then(this.handleSuccess, this.handleError);
  };

  render() {
    return <CarForm onSubmit={this.handleSubmit} />;
  }
}

const mapDispatchToProps = {
  postCar: postCar
};

export default connect(null, mapDispatchToProps)(CarFormContainer);
