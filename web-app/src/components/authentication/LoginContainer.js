import { loginAction } from "../../redux/authentication/authenticationActions";
import React from "react";
import LoginWindow from "../UI/LoginWindow";
import { connect } from "react-redux";

function LoginContainer(props) {
  const handleRegisterRedirection = () => {
    props.history.push("/register");
  };
  console.log(props);
  return (
    <LoginWindow
      login={props.login}
      register={handleRegisterRedirection}
    ></LoginWindow>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  login: loginAction
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
