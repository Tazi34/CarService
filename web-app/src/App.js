import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import LoginContainer from "./components/authentication/LoginContainer";
import AvailableCarList from "./components/car/AvailableCarList";
import Layout from "./components/UI/Layout";
import NotFoundErrorPage from "./components/UI/NotFoundErrorPage";
import ClientDetailsFormContainer from "./components/bookingForm/ClientDetailsFormContainer";
import AccountForm from "./components/account/AccountForm";

import { logout } from "./redux/authentication/authenticationActions";
import { connect } from "react-redux";
import UserReservationsContainer from "./components/reservations/UserReservationsContainer";
import { BookingAcceptanceWindow } from "./components/bookingForm/BookingAcceptanceWindow";
import AuthorizedPrivateRoute from "./components/privateRoute/AuthorizedPrivateRoute";
import { ROLE_ADMIN, ROLE_USER } from "./authorizationValues";
import Home from "./components/UI/Home";
import Background from "./images/vintageCarBackground.jpg";
import CarsTableContainer from "./components/admin/cars/CarsTableContainer";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Lato, sans-serif",
    fontSize: 18
  },
  palette: {
    primary: {
      main: "#121212"
    },

    secondary: {
      main: "#01579b"
    }
  },
  status: {
    danger: "orange"
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
          backgroundSize: "cover"
        }
      }
    }
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
            <Route exact path="/" component={Home} />
            <AuthorizedPrivateRoute
              user={props.auth.user}
              path="/cars/apply/:id"
              component={BookingAcceptanceWindow}
            />
            <Route path="/cars" component={AvailableCarList} />
            <AuthorizedPrivateRoute
              path="/details"
              user={props.auth.user}
              component={ClientDetailsFormContainer}
            />
            <AuthorizedPrivateRoute
              path="/admin/cars"
              roles={[ROLE_ADMIN]}
              user={props.auth.user}
              component={CarsTableContainer}
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
