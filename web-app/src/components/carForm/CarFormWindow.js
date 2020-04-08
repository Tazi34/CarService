import React, { Component } from "react";
import postCar from "../../redux/car/apiRequests/postCar";
import { connect } from "react-redux";
import { CarForm } from "./CarForm";
import { adminCarsPage } from "../../utilities/urls/pages";

class CarFormWindow extends Component {
  handleSuccess = () => {
    this.props.history.push(adminCarsPage);
  };

  handleError = () => {
    alert("Error");
  };

  onSubmit = car => {
    this.props.postCar(car).then(this.handleSuccess, this.handleError);
  };

  render() {
    return <CarForm onSubmit={this.onSubmit} />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  postCar: postCar
};

export default connect(mapStateToProps, mapDispatchToProps)(CarFormWindow);
