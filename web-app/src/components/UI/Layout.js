import React, { Component } from "react";
import { Container, Box } from "@material-ui/core";
import NavBar from "./NavBar";
export class Layout extends Component {
  render() {
    return (
      <Box>
        <NavBar />
        <Container>{this.props.children}</Container>
      </Box>
    );
  }
}

export default Layout;
