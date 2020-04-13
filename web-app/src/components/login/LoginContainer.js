import { loginAction } from "../../redux/authentication/authenticationActions";
import React, { Component } from "react";
import LoginWindow from "./LoginWindow";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { LoginCarousel } from "./LoginCarousel";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { compose } from "recompose";
import { registerPage } from "../../utilities/urls/pages";

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
  handleLoginError = error => {
    this.props.onError("Error");
  };
  handleSuccess = () => {
    this.props.onSuccess("Success");
  };

  handleLogin = userCredentials => {
    this.props.tryLogin(
      userCredentials,
      this.handleSuccess,
      this.handleLoginError
    );
  };
  handleRegisterRedirect = () => this.props.history.push(registerPage);

  render() {
    const { classes, authenticated, location } = this.props;
    const previousPage = location.state;
    const redirectLink = previousPage ? previousPage.from : "/";

    if (authenticated) {
      return <Redirect to={redirectLink} />;
    }

    return (
      <Grid container className={classes.root} justify={"center"}>
        <Grid item md={6} lg={6} className={classes.carousel}>
          <LoginCarousel className={classes.fullHeight} />
        </Grid>
        <Grid item xs={10} md={4} lg={4}>
          <LoginWindow
            login={this.handleLogin}
            register={this.handleRegisterRedirect}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.authentication.isAuthenticated
});

const mapDispatchToProps = {
  tryLogin: loginAction
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(LoginContainer);
