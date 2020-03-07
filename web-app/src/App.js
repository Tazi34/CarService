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

import { logout } from "./redux/authentication/authenticationActions";
import { connect } from "react-redux";
import UserReservationsContainer from "./components/reservations/UserReservationsContainer";
import { BookingAcceptanceWindow } from "./components/bookingForm/BookingAcceptanceWindow";
import PrivateRoute from "./components/privateRoute/AuthorizedPrivateRoute";
import AuthorizedPrivateRoute from "./components/privateRoute/AuthorizedPrivateRoute";
import { ROLE_ADMIN, ROLE_USER } from "./authorizationValues";

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
  //authenticated - token in local storage, but still waiting for user from server
  if (props.auth.isAuthenticated && props.auth.pending) return null;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        {/*Needed to apply background for whole page */}
        <Layout
          auth={{
            isAuthenticated: props.auth.isAuthenticated,
            logout: props.logout
          }}
        >
          <Switch>
            <Route exact path="/" component={DateLocationCarForm} />
            <AuthorizedPrivateRoute
              path="/cars/apply/:id"
              component={BookingAcceptanceWindow}
            />
            <Route path="/cars" component={AvailableCarList} />
            <PrivateRoute
              path="/details"
              component={ClientDetailsFormContainer}
            />
            <Route path="/login" component={LoginContainer} />
            <Route path="/register" component={AccountForm} />
            <AuthorizedPrivateRoute
              path="/reservations"
              component={UserReservationsContainer}
              roles={[ROLE_ADMIN, ROLE_USER]}
              user={props.auth.user}
            />
            <Route path="*" component={NotFoundErrorPage} />
          </Switch>
        </Layout>
      </CssBaseline>
    </MuiThemeProvider>
  );
}

const mapDispatchToProps = {
  logout: logout
};
const mapStateToProps = state => {
  return {
    auth: state.authentication
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
