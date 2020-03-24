import { loginAction } from "../../redux/authentication/authenticationActions";
import React, { PureComponent } from "react";
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

class LoginContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      redirectPage: "/",
      redirect: !props.authenticated
    };
  }

  handleLoginSuccess = () => {
    const { history } = this.props;

    // user accessed /login as first page
  };

  handleLoginError = error => {
    alert("error");
  };

  handleLogin = userCredentials => {
    this.props.tryLogin(
      userCredentials,
      this.handleLoginSuccess,
      this.handleLoginError
    );
  };
  handleRegisterRedirection = () => this.props.history.push("/register");

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
          <Box className={classes.fullHeight}>
            <LoginWindow
              login={this.handleLogin}
              register={this.handleRegisterRedirection}
            ></LoginWindow>
          </Box>
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
