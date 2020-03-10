import { loginAction } from "../../redux/authentication/authenticationActions";
import React from "react";
import LoginWindow from "../UI/LoginWindow";
import { connect } from "react-redux";
import { Redirect } from "react-router";

function LoginContainer(props) {
  if (props.user) {
    return <Redirect to={"/"} />;
  }

  const handleRegisterRedirection = () => props.history.push("/register");
  return (
    <LoginWindow
      login={props.login}
      register={handleRegisterRedirection}
    ></LoginWindow>
  );
}

const mapStateToProps = state => ({
  user: state.authentication.user,
  auth: state.authentication
});

const mapDispatchToProps = {
  login: loginAction
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
