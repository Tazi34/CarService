import React from 'react';
import './App.css';
import VisibleCarList from './components/car/VisibleCarList'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import NavBar from './components/UI/NavBar';
import { Box, Container } from '@material-ui/core';
const theme = createMuiTheme({
  palette: {

    primary: {
      main:"#121212",
    },
   
    secondary: {main:
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
        <NavBar/>
        <VisibleCarList></VisibleCarList>
      </Box> 
    </MuiThemeProvider>

   
  );
}

export default App;
