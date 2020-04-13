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
import { PasswordField } from "../login/PasswordField";
import { withAlertMessage } from "../wrappers/withAlertMessage/withAlertMessage";
import { withLoadingSpinner } from "../wrappers/withLoadingSpinner/withLoadingSpinner";
import { compose } from "recompose";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "600px",
    margin: "auto",
    padding: "10px 30px 30px 30px",
    marginTop: 60
  },
  button: {
    marginTop: "20px",
    marginBottom: "10px"
  }
}));

const RegistrationForm = ({ user, handleRegister, history, ...props }) => {
  const classes = useStyles();

  if (user) {
    history.replace("/");
  }

  const onSubmit = async values => {
    handleRegister(values).then(error => {
      if (error) {
        if (error.request.status === 400) {
          props.onError("Account with this email already exists.");
        } else {
          props.onError("Error occurred while processing action.");
        }
      } else {
        props.onSuccess("Your account was created.");
        history.replace("/");
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
              {fieldProps => (
                <TextField
                  type="email"
                  autoComplete={"username"}
                  fullWidth
                  label="Email"
                  name={fieldProps.input.name}
                />
              )}
            </Field>
            <Field name="password">
              {fieldProps => (
                <PasswordField
                  fullWidth
                  className={classes.field}
                  label="Password"
                  name={fieldProps.input.name}
                />
              )}
            </Field>
            <Field name="passwordConfirmation">
              {fieldProps => (
                <TextField
                  autoComplete={"new-password"}
                  type="password"
                  fullWidth
                  label="Confirm password"
                  name={fieldProps.input.name}
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
};

const mapDispatchToProps = {
  handleRegister: register
};

export default compose(
  withAlertMessage,
  withLoadingSpinner,
  connect(null, mapDispatchToProps)
)(RegistrationForm);
