import React from "react";
import { connect } from "react-redux";
import { selectCar } from "../../../redux/bookingForm/bookingFormActions";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import { loginPage, reservationSummaryPage } from "../../../urlAPI";

const BookCarButton = props => {
  const history = useHistory();

  const handleCarSelection = () => {
    const car = props.car;
    let redirectDirectory;
    if (props.authenticated) {
      props.selectCar(car);
      redirectDirectory = reservationSummaryPage;
    } else {
      redirectDirectory = loginPage;
    }
    history.push(redirectDirectory);
  };
  return (
    <Button
      variant="contained"
      size="small"
      color="primary"
      onClick={handleCarSelection}
    >
      BOOK
    </Button>
  );
};

const mapStateToProps = state => ({
  authenticated: state.authentication.isAuthenticated
});
const mapDispatchToProps = {
  selectCar: selectCar
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCarButton);
