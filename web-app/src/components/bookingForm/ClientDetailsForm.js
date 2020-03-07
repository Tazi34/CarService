import { Button, Grid } from "@material-ui/core";
import { Select, TextField } from "mui-rff";
import React from "react";
import { Field, Form } from "react-final-form";
import countries from "./countries";
import { useHistory } from "react-router";

import * as yup from "yup";
import { string } from "yup";

const validationSchema = yup.object().shape({
  firstName: string().required("Required"),
  lastName: string().required("Required"),
  email: string()
    .email()
    .required("Required"),
  pid: string().required("Required"),
  street: string().required("Required"),
  houseNumber: string().required("Required"),
  country: string().required("Required"),
  city: string().required("Required"),
  postalCode: string().required("Required")
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

export default function ClientDetailsForm(props) {
  const history = useHistory();
  const clientDetails = props.clientDetails;
  let initialValues = { email: props.email };
  if (clientDetails) {
    initialValues = {
      ...initialValues,
      firstName: clientDetails.name,
      lastName: clientDetails.surname,
      pid: clientDetails.pid,
      phoneNumber: clientDetails.phoneNumber,
      city: clientDetails.address.city,
      postalCode: clientDetails.address.postalCode,
      country: clientDetails.address.country,
      street: clientDetails.address.street,
      houseNumber: clientDetails.address.houseNumber
    };
  }

  return (
    <div
      style={{
        padding: "3px",
        backgroundColor: "#f4f4f4"
      }}
    >
      <Form
        onSubmit={props.onSubmit}
        subscription={{ submitting: true }}
        initialValues={initialValues}
        //todo enable validation
        validate={null}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={3}>
              <Grid item container direction="row" spacing={2}>
                <Grid item xs={6}>
                  <Field name="firstName">
                    {props => (
                      <TextField
                        fullWidth
                        /*required*/
                        label="First Name"
                        variant="outlined"
                        name={props.input.name}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <Field name="lastName">
                    {props => (
                      <TextField
                        fullWidth
                        /*required*/
                        label="Last Name"
                        variant="outlined"
                        name={props.input.name}
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>

              <Grid item>
                <Field name="pid">
                  {props => (
                    <TextField
                      fullWidth
                      /*required*/
                      label="Personal ID number"
                      variant="outlined"
                      name={props.input.name}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item container direction="row" spacing={2}>
                <Grid item xs={6}>
                  <Field name="street">
                    {props => (
                      <TextField
                        fullWidth
                        /*required*/
                        label="Street"
                        variant="outlined"
                        name={props.input.name}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <Field name="houseNumber">
                    {props => (
                      <TextField
                        fullWidth
                        /*required*/
                        label="House number"
                        variant="outlined"
                        name={props.input.name}
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>

              <Grid item container direction="row" spacing={2}>
                <Grid item xs={6}>
                  <Select
                    name="country"
                    label="Country"
                    formControlProps={{ margin: "normal" }}
                    data={countries}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field name="city">
                    {props => (
                      <TextField
                        /*required*/
                        fullWidth
                        label="City"
                        variant="outlined"
                        name={props.input.name}
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
              <Grid item container direction="row" spacing={2}>
                <Grid item xs={3}>
                  <Field name="postalCode">
                    {props => (
                      <TextField
                        fullWidth
                        /*required*/
                        label="Postal code"
                        variant="outlined"
                        name={props.input.name}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={9}>
                  <Field name="phoneNumber">
                    {props => (
                      <TextField
                        fullWidth
                        /*required*/
                        label="Phone number"
                        variant="outlined"
                        name={props.input.name}
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
              <Grid item>
                <Field name="email">
                  {props => (
                    <TextField
                      fullWidth
                      /*required*/
                      label="Email"
                      variant="outlined"
                      name={props.input.name}
                      disabled={true}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item>
                <Button
                  disabled={submitting}
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  Submit
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => history.goBack()}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Form>
    </div>
  );
}
