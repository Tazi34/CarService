import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import './App.css';
import VisibleCarList from './components/car/VisibleCarList';
import Layout from './components/UI/Layout'
import { Route } from 'react-router-dom';
import Home from './components/UI/Home';
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



function App(props) {
  return (
    <MuiThemeProvider theme={theme} >
      <Layout style={{width:"100%",height:"100%"}}>
        <Route path="/" component={Home} />
        <Route path="/cars" component={VisibleCarList} />
      </Layout>
    </MuiThemeProvider>
  );
}
export default App;
