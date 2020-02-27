import { Button, Grid } from "@material-ui/core";
import { Select, TextField } from "mui-rff";
import React from "react";
import { Field, Form } from "react-final-form";
import { Redirect } from "react-router-dom";
import countries from "../../MockData/countries";
import { connect } from "react-redux";
import { postReservationForm } from "../../redux/reservation/reservationActions";

function ReservationForm(props) {
  if (!props.reservation.car.selected) return <Redirect to="/"></Redirect>;
  return (
    <div
      style={{
        padding: "3px",
        backgroundColor: "#f4f4f4"
      }}
    >
      <Form onSubmit={props.postForm} subscription={{ submitting: true }}>
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
                <Field name="personalIdNumber">
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
                    value="PL"
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
              </Grid>
            </Grid>
          </form>
        )}
      </Form>
    </div>
  );
}

const mapStateToProps = state => ({
  reservation: state.currentReservation
});

const mapDispatchToProps = {
  postForm: postReservationForm
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationForm);
