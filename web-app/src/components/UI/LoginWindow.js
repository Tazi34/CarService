import React from "react";
import { Field, Form } from "react-final-form";
import { TextField } from "mui-rff";
import { Button } from "@material-ui/core";

export default function LoginWindow(props) {
  return (
    <Form onSubmit={values => props.login(values)}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="email">
            {props => (
              <TextField
                fullWidth
                label="Email address"
                name={props.input.name}
              />
            )}
          </Field>
          <Field name="password">
            {props => (
              <TextField
                fullWidth
                label="Password"
                type="password"
                name={props.input.name}
              />
            )}
          </Field>
          <Button color="primary" variant="contained" type="submit">
            Login
          </Button>
          <Button variant="outlined" onClick={props.register}>
            Register
          </Button>
        </form>
      )}
    </Form>
  );
}
