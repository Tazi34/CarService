import { Box } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import './App.css';
import NavBar from './components/UI/NavBar';
import VisibleCarList from './components/car/VisibleCarList'
const theme = createMuiTheme({
  palette: {

    primary: {
      main: "#121212",
    },

    secondary: {
      main:
        "#01579b",
    }
  },

  status: {
    danger: 'orange',
  },
});


function App() {


  return (
    //<CarReservationForm></CarReservationForm>

   
      <MuiThemeProvider theme={theme} >
        <Box bgcolor="primary.light">
          <NavBar />

           <VisibleCarList></VisibleCarList> 
        </Box>
      </MuiThemeProvider>
  
  );
}

export default App;
