import React from "react";
import { Field, Form } from "react-final-form";
import { TextField } from "mui-rff";
import { connect } from "react-redux";
import { register } from "../../redux/registration/registrationActions";
import { ref, string } from "yup";

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

function AccountForm(props) {
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
    <Form
      onSubmit={onSubmit}
      validate={validate}
      subscription={{ submitting: true }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
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
                /*required*/
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
                /*required*/
                label="Confirm password"
                variant="outlined"
                name={props.input.name}
              />
            )}
          </Field>
          <button type="submit">SUBMIT</button>
        </form>
      )}
    </Form>
  );
}

const mapStateToProps = state => ({
  registration: state.registration
});

const mapDispatchToProps = {
  register: register
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);
