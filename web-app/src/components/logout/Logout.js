// @flow
import * as React from "react";
import { logout } from "../../redux/authentication/authenticationActions";
import { Redirect } from "react-router";
import { connect } from "react-redux";

function Logout(props) {
  props.logout();
  return <Redirect to={"/"} push={true} />;
}

const mapDispatchToProps = {
  logout: logout
};
export default connect(null, mapDispatchToProps)(Logout);
