import React from "react";
import { Field, Form } from "react-final-form";
import { TextField } from "mui-rff";
import { connect } from "react-redux";
import { register } from "../../redux/registration/registrationActions";

import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { getSchemaValidator } from "../../utilities/validation";
import { registerFormValidationSchema } from "./validation";
import { useHistory } from "react-router";
import { PasswordField } from "../login/PasswordField";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "600px",
    margin: "auto",
    padding: "10px 30px"
  },
  button: {
    marginTop: "20px",
    marginBottom: "10px"
  }
}));

function RegistrationForm(props) {
  const history = useHistory();
  if (props.user) {
    history.replace("/");
  }
  const classes = useStyles();
  const onSubmit = async values => {
    props.register(values).then(error => {
      if (error) {
        if (error.request.status === 400)
          alert("Account with this email already exists.");
        else alert("There was error creating your registerForm");
      } else {
        alert("You are registerForm was created,");
        props.history.replace("/");
      }
    });
  };

  return (
    <Paper className={classes.root}>
      <Form
        onSubmit={onSubmit}
        validate={getSchemaValidator(registerFormValidationSchema)}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Typography align={"center"} variant={"h5"} color={"primary"}>
              SIGN UP
            </Typography>
            <Field name="email">
              {props => (
                <TextField
                  type="email"
                  fullWidth
                  label="Email"
                  name={props.input.name}
                />
              )}
            </Field>
            <Field name="password">
              {props => (
                <PasswordField
                  fullWidth
                  className={classes.field}
                  label="Password"
                  name={props.input.name}
                />
              )}
            </Field>
            <Field name="passwordConfirmation">
              {props => (
                <TextField
                  type="password"
                  fullWidth
                  label="Confirm password"
                  name={props.input.name}
                />
              )}
            </Field>
            <Button
              variant={"contained"}
              color={"primary"}
              fullWidth
              type="submit"
              className={classes.button}
            >
              SUBMIT
            </Button>
          </form>
        )}
      </Form>
    </Paper>
  );
}

const mapStateToProps = state => ({
  registration: state.registration
});

const mapDispatchToProps = {
  register: register
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
