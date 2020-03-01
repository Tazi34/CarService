import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import AvailableCarList from "./components/car/AvailableCarList";
import Layout from "./components/UI/Layout";
import DateLocationCarForm from "./components/reservationForm/DateLocationCarForm";
import PersonDetailsForm from "./components/reservationForm/PersonDetailsForm";
import NotFoundErrorPage from "./components/UI/NotFoundErrorPage";
import xd from "./components/UI/xd";
import GuestReservationFormContainer from "./components/reservationForm/GuestReservationFormContainer";
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
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        {/*Needed to apply background for whole page */}
        <Layout>
          <Switch>
            <Route exact path="/" component={DateLocationCarForm} />
            <Route
              path="/cars/apply/:id"
              component={GuestReservationFormContainer}
            />
            <Route path="/cars" component={AvailableCarList} />
            <Route path="/xd" component={PersonDetailsForm} />
            <Route path="*" component={NotFoundErrorPage} />
          </Switch>
        </Layout>
      </CssBaseline>
    </MuiThemeProvider>
  );
}
export default App;
