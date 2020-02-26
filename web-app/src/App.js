import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import "./App.css";
import VisibleCarList from "./components/car/VisibleCarList";
import Layout from "./components/UI/Layout";
import { Route } from "react-router-dom";
import ReservationForm from "./components/reservationForm/ReservationForm";
import { purple } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
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
          <Route exact path="/" component={ReservationForm} />
          <Route path="/cars" component={VisibleCarList} />
        </Layout>
      </CssBaseline>
    </MuiThemeProvider>
  );
}
export default App;
