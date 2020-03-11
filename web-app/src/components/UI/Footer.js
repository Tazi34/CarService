import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  root: {
    color: "white",
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    textAlign: "center"
  },
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(1, 2),
    marginTop: "auto",
    background:
      "linear-gradient(90deg, rgba(18,7,10,0.7791491596638656) 32%, rgba(0,0,0,0.7707457983193278) 77%)"
  },
  text: {
    color: "white"
  }
}));

export default function Footer() {
  const classes = useStyles();

  function Copyright() {
    return (
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.text}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://github.com/Tazi34">
          Pawel Kasjaniuk
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">Car service.</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
