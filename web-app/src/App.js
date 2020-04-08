import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import LoginContainer from "./components/login/LoginContainer";
import AvailableCarList from "./components/availableCars/AvailableCars";
import Layout from "./components/UI/Layout";
import NotFoundErrorPage from "./components/UI/NotFoundErrorPage";
import ClientDetailsFormContainer from "./components/clientDetailsForm/ClientDetailsFormContainer";
import RegistrationForm from "./components/registerForm/RegistrationForm";
import { logout } from "./redux/authentication/authenticationActions";
import { connect } from "react-redux";
import UserReservations from "./components/userReservations/UserReservations";
import AuthorizedPrivateRoute from "./components/privateRoute/AuthorizedPrivateRoute";
import { ROLE_ADMIN, ROLE_USER } from "./authorizationValues";
import Home from "./components/UI/home/Home";
import Background from "./images/vintageCarBackground.jpg";
import CarsTableContainer from "./components/admin/cars/CarsTableContainer";

import { green, red } from "@material-ui/core/colors";
import {
  adminCarsPage,
  adminStatusPage,
  carFormPage,
  carsPage,
  detailsPage,
  loginPage,
  logoutPage,
  registerPage,
  reservationsPage,
  reservationSummaryPage
} from "./utilities/urls/pages";
import ReservationSummaryContainer from "./components/reservationSummary/ReservationSummaryContainer";
import StatusTableContainer from "./components/statusTable/StatusTableContainer";
import CarFormWindow from "./components/carForm/CarFormWindow";
import Logout from "./components/logout/Logout";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Lato, sans-serif"
  },
  background: "#f4f4f4",
  palette: {
    primary: {
      main: green["700"]
    },
    danger: red,
    secondary: {
      main: green["500"]
    }
  },
  status: {
    danger: "orange"
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage: ` linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),url(${Background})`,
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
            user: props.auth.user,
            logout: props.logout
          }}
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthorizedPrivateRoute
              user={props.auth.user}
              path={reservationSummaryPage}
              component={ReservationSummaryContainer}
            />
            <AuthorizedPrivateRoute
              user={props.auth.user}
              path={carFormPage}
              component={CarFormWindow}
            />
            <Route path={carsPage} component={AvailableCarList} />
            <AuthorizedPrivateRoute
              path={detailsPage}
              user={props.auth.user}
              component={ClientDetailsFormContainer}
            />
            <AuthorizedPrivateRoute
              exact
              path={adminCarsPage}
              roles={[ROLE_ADMIN]}
              user={props.auth.user}
              component={CarsTableContainer}
            />
            <AuthorizedPrivateRoute
              path={adminStatusPage}
              roles={[ROLE_ADMIN]}
              user={props.auth.user}
              component={StatusTableContainer}
            />
            <Route path={loginPage} component={LoginContainer} />
            <Route
              path={registerPage}
              render={subProps => (
                <RegistrationForm {...subProps} user={props.auth.user} />
              )}
            />
            <AuthorizedPrivateRoute
              path={reservationsPage}
              component={UserReservations}
              roles={[ROLE_ADMIN, ROLE_USER]}
              user={props.auth.user}
            />
            <Route path={logoutPage} component={Logout} />
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
