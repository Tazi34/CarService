import { loginAction } from "../../redux/authentication/authenticationActions";
import React from "react";
import LoginWindow from "../account/LoginWindow";
import { connect } from "react-redux";

function LoginContainer(props) {
  console.log(props);
  return <LoginWindow loginRequest={props.login}></LoginWindow>;
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  login: loginAction
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
