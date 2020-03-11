import React from "react";
import { Box } from "@material-ui/core";
import NavBar from "./NavBar";
import Footer from "./Footer";

// @flow

function Layout(props) {
  return (
    <Box>
      <NavBar auth={props.auth} />
      <Box
        style={{
          margin: "auto",
          width: "80%"
        }}
        // style={{
        //   background:
        //     "linear-gradient(90deg, rgba(232,215,219,0.6474964985994398) 11%, rgba(0,0,0,0.5970763305322129) 50%, rgba(238,233,234,0.7091211484593838) 92%)"
        // }}
      >
        {props.children}
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
