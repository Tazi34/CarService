import { loginAction } from "../../redux/authentication/authenticationActions";
import React from "react";
import LoginWindow from "./LoginWindow";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Box from "@material-ui/core/Box";
import { LoginCarousel } from "./LoginCarousel";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
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
}));

function LoginContainer(props) {
  const classes = useStyles();

  if (props.user) {
    return <Redirect to={"/"} />;
  }

  const handleRegisterRedirection = () => props.history.push("/register");
  return (
    <Grid container className={classes.root} justify={"center"}>
      <Grid item md={6} lg={6} className={classes.carousel}>
        <LoginCarousel className={classes.fullHeight} />
      </Grid>
      <Grid item xs={10} md={4} lg={4}>
        <Box className={classes.fullHeight}>
          <LoginWindow
            login={props.login}
            register={handleRegisterRedirection}
          ></LoginWindow>
        </Box>
      </Grid>
    </Grid>
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
