import React from "react";
import { Box, Container } from "@material-ui/core";
import NavBar from "./NavBar";

// @flow

function Layout(props) {
  return (
    <Box
      style={{
        width: "100%",
        height: "100vh"
      }}
    >
      <NavBar auth={props.auth} />
      <Container
        style={{
          width: "70%",
          minWidth: "300px",
          backgroundColor: "#f4f4f4",
          height: "100vh"
        }}
      >
        {props.children}
      </Container>
    </Box>
  );
}

export default Layout;
