import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import LoginContainer from "./components/authentication/LoginContainer";
import AvailableCarList from "./components/car/AvailableCarList";
import DateLocationCarForm from "./components/bookingForm/DateLocationForm";
import Layout from "./components/UI/Layout";
import NotFoundErrorPage from "./components/UI/NotFoundErrorPage";
import ClientDetailsFormContainer from "./components/bookingForm/ClientDetailsFormContainer";
import AccountForm from "./components/account/AccountForm";

import {
  fetchUser,
  logout
} from "./redux/authentication/authenticationActions";
import { connect } from "react-redux";
import Axios from "axios";
import UserReservationsContainer from "./components/reservations/UserReservationsContainer";
import { BookingAcceptanceWindow } from "./components/bookingForm/BookingAcceptanceWindow";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#121212"
    },

    secondary: {
      main: "#01579b"
    },
    background: {
      default: "#303030"
    }
  },
  status: {
    danger: "orange"
  }
});

function App(props) {
  Axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("userToken")}`;
  const auth = props.isAuthenticated;
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        {/*Needed to apply background for whole page */}
        <Layout
          auth={{ isLogged: props.isAuthenticated, logout: props.logout }}
        >
          <Switch>
            <Route exact path="/" component={DateLocationCarForm} />
            <PrivateRoute
              auth={auth}
              path="/cars/apply/:id"
              component={BookingAcceptanceWindow}
            />
            <Route path="/cars" component={AvailableCarList} />
            <PrivateRoute
              auth={auth}
              path="/details"
              component={ClientDetailsFormContainer}
            />
            <Route path="/login" component={LoginContainer} />
            <Route path="/register" component={AccountForm} />
            <PrivateRoute
              auth={auth}
              path="/reservations"
              component={UserReservationsContainer}
            />
            <Route path="*" component={NotFoundErrorPage} />
          </Switch>
        </Layout>
      </CssBaseline>
    </MuiThemeProvider>
  );
}

const mapDispatchToProps = {
  getUser: fetchUser,
  logout: logout
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
