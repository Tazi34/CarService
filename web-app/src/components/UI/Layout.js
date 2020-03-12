import React from "react";
import { Box, Container } from "@material-ui/core";
import NavBar from "./navbar/NavBar";
import Footer from "./Footer";

// @flow

function Layout(props) {
  return (
    <Box>
      <NavBar auth={props.auth} />
      <Container
        style={{
          margin: "auto",
          width: "80%"
        }}
      >
        {props.children}
      </Container>
      <Footer />
    </Box>
  );
}

export default Layout;
