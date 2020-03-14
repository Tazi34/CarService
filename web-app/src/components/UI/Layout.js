import React from "react";
import { Container } from "@material-ui/core";
import NavBar from "./navbar/NavBar";
import Footer from "./Footer";

// @flow

function Layout(props) {
  return (
    <>
      <NavBar auth={props.auth} />
      <Container maxWidth={false}>{props.children}</Container>
      <Footer />
    </>
  );
}

export default Layout;
