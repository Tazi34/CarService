import React from "react";
import Paper from "@material-ui/core/Paper";

import { Field, Form } from "react-final-form";
import { KeyboardDatePicker, TextField } from "mui-rff";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { getSchemaValidator } from "../../utilities/validation";
import { blockFormValidationSchema } from "./validation";

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

export const BlockCarForm = ({ onSubmit, onBack, ...props }) => {
  const classes = useStyles();
  const initialValues = {
    startDate: moment(),
    endDate: moment().add(1, "day")
  };
  return (
    <Paper className={classes.root} {...props}>
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={getSchemaValidator(blockFormValidationSchema)}
      >
        {({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <Field name="startDate">
                  {props => (
                    <KeyboardDatePicker
                      autoOk={true}
                      fullWidth
                      variant="inline"
                      disablePast={true}
                      format="dd/MM/yyyy"
                      margin="normal"
                      name={props.input.name}
                      label={"From"}
                      dateFunsUtils={DateFnsUtils}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Field name="endDate">
                  {props => (
                    <KeyboardDatePicker
                      autoOk={true}
                      fullWidth
                      variant="inline"
                      minDate={moment(values.startDate).add(1, "day")}
                      disablePast={true}
                      format="dd/MM/yyyy"
                      margin="normal"
                      name={props.input.name}
                      label={"To"}
                      dateFunsUtils={DateFnsUtils}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field name="comment">
                  {props => (
                    <TextField
                      multiline
                      rows="4"
                      rowsMax={"4"}
                      fullWidth
                      label="Comment"
                      variant="outlined"
                      name={props.input.name}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type={"submit"}
                  variant={"contained"}
                  fullWidth
                  color={"primary"}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant={"contained"} fullWidth onClick={onBack}>
                  Back
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Form>
    </Paper>
  );
};
