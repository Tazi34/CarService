import React from "react";
import { Field, Form } from "react-final-form";
import { TextField } from "mui-rff";
import { Box, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { PasswordField } from "./PasswordField";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  container: {
    height: "100%",
    padding: "20px 30px"
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

export default function LoginWindow(props) {
  const classes = useStyles();

  return (
    <Box bgcolor={"background.default"} className={classes.container}>
      <Form onSubmit={values => props.login(values)}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} style={{ height: "100%" }}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              style={{ height: "100%" }}
            >
              <div style={{ flexGrow: 0.8 }}></div>
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
                  <Button fullWidth variant="outlined" onClick={props.register}>
                    SIGN UP
                  </Button>
                </Grid>
              </Grid>
              <Typography className={classes.field}>
                Forgot password?
              </Typography>
              <div style={{ flexGrow: 1 }}></div>
            </Box>
          </form>
        )}
      </Form>
    </Box>
  );
}
