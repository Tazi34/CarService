import { loginAction } from "../../redux/authentication/authenticationActions";
import React, { Component } from "react";
import LoginWindow from "./LoginWindow";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Box from "@material-ui/core/Box";
import { LoginCarousel } from "./LoginCarousel";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { compose } from "recompose";

const styles = theme => ({
  root: {
    margin: "auto",
    paddingTop: "100px"
  },
  media: {
    flexGrow: 1
  },
  carousel: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },

  fullHeight: {
    height: "100%"
  }
});

class LoginContainer extends Component {
  // const handleLoginSuccess = () => {};
  //
  // const handleLoginError = error => {};
  //
  // const handleLogin = userCredentials => {
  //   props.tryLogin(userCredentials, handleLoginSuccess, handleLoginError);
  // };
  render() {
    const { classes, user } = this.props;

    if (user) {
      return <Redirect to={"/"} />;
    }

    const handleRegisterRedirection = () =>
      this.props.history.push("/register");
    return (
      <Grid container className={classes.root} justify={"center"}>
        <Grid item md={6} lg={6} className={classes.carousel}>
          <LoginCarousel className={classes.fullHeight} />
        </Grid>
        <Grid item xs={10} md={4} lg={4}>
          <Box className={classes.fullHeight}>
            <LoginWindow
              login={this.props.login}
              register={handleRegisterRedirection}
            ></LoginWindow>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user,
  auth: state.authentication
});

const mapDispatchToProps = {
  login: loginAction
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(LoginContainer);
