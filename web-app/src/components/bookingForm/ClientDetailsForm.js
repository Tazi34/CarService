import { Button, Grid } from "@material-ui/core";
import { Select, TextField } from "mui-rff";
import React from "react";
import { Field, Form } from "react-final-form";
import countries from "./countries";
import { useHistory } from "react-router";

import * as yup from "yup";
import { string } from "yup";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";

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

const useStyles = makeStyles(theme => ({
  root: {}
}));

export default function ClientDetailsForm(props) {
  const classes = useStyles();
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
    <Paper className={classes.root}>
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
                <Grid item xs={12} sm={6}>
                  <Field name="firstName">
                    {props => (
                      <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        name={props.input.name}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field name="lastName">
                    {props => (
                      <TextField
                        fullWidth
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
                      label="Personal ID number"
                      variant="outlined"
                      name={props.input.name}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item container direction="row" spacing={2}>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                  <Select
                    name="country"
                    label="Country"
                    formControlProps={{ margin: "normal" }}
                    data={countries}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field name="city">
                    {props => (
                      <TextField
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
                <Grid item xs={12} sm={4}>
                  <Field name="postalCode">
                    {props => (
                      <TextField
                        fullWidth
                        label="Postal code"
                        variant="outlined"
                        name={props.input.name}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Field name="phoneNumber">
                    {props => (
                      <TextField
                        fullWidth
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
                      label="Email"
                      variant="outlined"
                      name={props.input.name}
                      disabled={true}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item container>
                <Grid item xs={12} sm={6}>
                  <Button
                    disabled={submitting}
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    color="secondary"
                    variant="contained"
                    onClick={() => history.goBack()}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Form>
    </Paper>
  );
}
