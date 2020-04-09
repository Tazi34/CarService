import { Button, Grid } from "@material-ui/core";
import { TextField } from "mui-rff";
import React from "react";
import { Field, Form } from "react-final-form";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import { ReturnButton } from "../UI/ReturnButton";
import { clientDetailsValidationSchema } from "./validation";
import { getSchemaValidator } from "../../utilities/validation";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1000,
    margin: "auto",
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

export default function ClientDetailsForm({
  clientDetails,
  email,
  onSubmit,
  ...props
}) {
  const classes = useStyles();

  let initialValues = { email };

  if (clientDetails) {
    const {
      address: { city, postalCode, country, street, houseNumber },
      name: firstName,
      surname: lastName,
      pid,
      phoneNumber
    } = clientDetails;

    initialValues = {
      ...initialValues,
      firstName,
      lastName,
      pid,
      phoneNumber,
      city,
      postalCode,
      country,
      street,
      houseNumber
    };
  }

  return (
    <Paper className={classes.root}>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={getSchemaValidator(clientDetailsValidationSchema)}
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
                    className={clsx(classes.button, classes.returnButton)}
                    variant={"outlined"}
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
