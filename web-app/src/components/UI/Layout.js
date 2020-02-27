import React, { Component } from "react";
import { Container, Box } from "@material-ui/core";
import NavBar from "./NavBar";
export class Layout extends Component {
  render() {
    return (
      <Box
        style={{
          width: "100%",
          height: "100vh"
        }}
      >
        <NavBar />
        <Container
          style={{
            width: "70%",
            minWidth: "300px",
            backgroundColor: "#f4f4f4",
            height: "100vh"
          }}
        >
          {this.props.children}
        </Container>
      </Box>
    );
  }
}

export default Layout;
