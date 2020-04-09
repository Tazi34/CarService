import React from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import { Field, Form } from "react-final-form";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { getSchemaValidator } from "../../utilities/validation";
import { TextField } from "mui-rff";
import Typography from "@material-ui/core/Typography";
import { carFormValidationSchema } from "./validation";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 800,
    margin: "auto",
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

export const CarForm = ({ onSubmit, onBack, ...props }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} {...props}>
      <Typography align={"center"} color={"primary"} variant={"h5"}>
        ADD CAR
      </Typography>
      <Form
        onSubmit={onSubmit}
        validate={getSchemaValidator(carFormValidationSchema)}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={3}>
              <Grid item container direction="row" spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field name="make">
                    {props => (
                      <TextField
                        placeholder={"E.g. Honda"}
                        fullWidth
                        label="Make"
                        variant="outlined"
                        name={props.input.name}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field name="model">
                    {props => (
                      <TextField
                        placeholder={"E.g. Civic"}
                        fullWidth
                        label="Model"
                        variant="outlined"
                        name={props.input.name}
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>

              <Grid item container direction="row" spacing={2}>
                <Grid item xs={12} sm={3}>
                  <Field name="seats">
                    {props => (
                      <TextField
                        fullWidth
                        label="Seats"
                        variant="outlined"
                        name={props.input.name}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field name="doors">
                    {props => (
                      <TextField
                        fullWidth
                        label="Doors"
                        variant="outlined"
                        name={props.input.name}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field name="year">
                    {props => (
                      <TextField
                        fullWidth
                        label="Year"
                        variant="outlined"
                        name={props.input.name}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field name="price">
                    {props => (
                      <TextField
                        fullWidth
                        label="Price"
                        variant="outlined"
                        name={props.input.name}
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
              <Grid item>
                <Field name="licence">
                  {props => (
                    <TextField
                      fullWidth
                      label="Licence"
                      variant="outlined"
                      name={props.input.name}
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
                  <Button
                    className={clsx(classes.button, classes.returnButton)}
                    variant={"outlined"}
                    color={"secondary"}
                    onClick={onBack}
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
};
