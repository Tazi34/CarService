import React from "react";
import { Container } from "@material-ui/core";
import NavBar from "./navbar/NavBar";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme => ({
  root: {
    width: "90%",
    margin: "auto",
    [theme.breakpoints.up(1600)]: {
      width: "70%"
    }
  }
}));

function Layout(props) {
  const classes = styles();
  return (
    <>
      <NavBar auth={props.auth} />
      <Container className={classes.root} maxWidth={false}>
        {props.children}
      </Container>
      {/*<Footer />*/}
    </>
  );
}

export default Layout;
