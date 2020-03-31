import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { TextField } from "mui-rff";
import { connect } from "react-redux";
import { register } from "../../redux/registration/registrationActions";
import { ref, string } from "yup";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

let yup = require("yup");

const validationSchema = yup.object().shape({
  email: string()
    .email("Please enter correct email address.")
    .required("Required"),
  password: string().required("No password provided"),
  passwordConfirmation: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Required")
});

const validate = async values => {
  try {
    await validationSchema.validate(values, { abortEarly: false });
  } catch (err) {
    return err.inner.reduce(
      (formError, innerError) => ({
        ...formError,
        [innerError.path]: innerError.message
      }),
      {}
    );
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "600px",
    margin: "auto",
    padding: "10px 30px"
  },
  button: {
    marginTop: "10px",
    marginBottom: "10px"
  }
}));

function RegistrationForm(props) {
  const classes = useStyles();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const onSubmit = async values => {
    props.register(values).then(error => {
      if (error) {
        if (error.request.status === 400)
          alert("Account with this email already exists.");
        else alert("There was error creating your account");
      } else {
        alert("You are account was created,");
        props.history.replace("/");
      }
    });
  };

  return (
    <Paper className={classes.root}>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        subscription={{ submitting: true }}
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
                  variant="outlined"
                  name={props.input.name}
                />
              )}
            </Field>
            <Field name="password">
              {props => (
                <TextField
                  type="password"
                  fullWidth
                  label="Password"
                  variant="outlined"
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
                  variant="outlined"
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
