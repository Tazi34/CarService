import React from "react";
import { Field, Form } from "react-final-form";
import { TextField } from "mui-rff";
import { Box, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { PasswordField } from "./PasswordField";
import Grid from "@material-ui/core/Grid";
import { getSchemaValidator } from "../../utilities/validation";
import { loginValidationSchema } from "./validation";

const useStyles = makeStyles(theme => ({
  container: {
    padding: "20px 30px",
    height: "100%"
  },
  title: {
    padding: "10px 0 20px 0"
  },
  field: {
    margin: "10px auto"
  },
  buttonContainer: {
    marginTop: "20px",
    marginBottom: "10px"
  }
}));

export default function LoginWindow({ login, register, ...props }) {
  const classes = useStyles();

  return (
    <Box
      bgcolor={"background.default"}
      className={classes.container}
      {...props}
    >
      <Form
        onSubmit={values => login(values)}
        validate={getSchemaValidator(loginValidationSchema)}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography
                className={classes.title}
                variant={"h5"}
                align={"center"}
              >
                LOGIN
              </Typography>
              <Field name="email">
                {props => (
                  <TextField
                    className={classes.field}
                    fullWidth
                    autoComplete={"username"}
                    label="Email address"
                    name={props.input.name}
                  />
                )}
              </Field>

              <Field name="password">
                {props => (
                  <PasswordField
                    fullWidth
                    className={classes.field}
                    label="Password"
                    name={props.input.name}
                  />
                )}
              </Field>

              <Grid container spacing={2} className={classes.buttonContainer}>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button fullWidth variant="outlined" onClick={register}>
                    SIGN UP
                  </Button>
                </Grid>
              </Grid>
              <Typography className={classes.field}>
                Forgot password?
              </Typography>
            </Box>
          </form>
        )}
      </Form>
    </Box>
  );
}
