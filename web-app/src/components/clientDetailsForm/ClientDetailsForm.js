import { Button, Grid } from "@material-ui/core";
import { TextField } from "mui-rff";
import React from "react";
import { Field, Form } from "react-final-form";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import { ReturnButton } from "../UI/ReturnButton";
import { validate } from "./validation";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1000,
    marginTop: 50,
    padding: "30px 30px"
  },
  button: {
    minWidth: 200
  },
  returnButton: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  }
}));

export default function ClientDetailsForm(props) {
  const classes = useStyles();
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
        initialValues={initialValues}
        validate={validate}
      >
        {({ handleSubmit }) => (
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
                  <Field name="country">
                    {props => (
                      <TextField
                        fullWidth
                        label="Country"
                        variant="outlined"
                        name={props.input.name}
                      />
                    )}
                  </Field>
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
              <Grid item container justify={"center"} spacing={4}>
                <Grid item>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    className={classes.button}
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <ReturnButton
                    className={`${classes.button} ${classes.returnButton}`}
                    variant={"outlined"}
                    color={"secondary"}
                  >
                    Back
                  </ReturnButton>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Form>
    </Paper>
  );
}
