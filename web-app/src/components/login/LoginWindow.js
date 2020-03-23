import React from "react";
import { Field, Form } from "react-final-form";
import { TextField } from "mui-rff";
import { Box, Button, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { PasswordField } from "./PasswordField";

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 400,
    height: 600,
    borderRadius: 5,
    padding: "20px 30px 20px 30px"
  },
  title: {
    padding: "10px 0 20px 0"
  },
  field: {
    margin: "10px auto"
  },
  button: {
    margin: "5px 10px"
  }
}));

export default function LoginWindow(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
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

              <Box display={"flex"}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  type="submit"
                  className={classes.button}
                >
                  Login
                </Button>
                <Button
                  className={classes.button}
                  fullWidth
                  variant="outlined"
                  onClick={props.register}
                >
                  SIGN UP
                </Button>
              </Box>
              <Typography className={classes.field}>
                Forgot password?
              </Typography>
              <div style={{ flexGrow: 1 }}></div>
            </Box>
          </form>
        )}
      </Form>
    </Paper>
  );
}
