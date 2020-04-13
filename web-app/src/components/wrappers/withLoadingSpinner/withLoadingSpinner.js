import React, { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));
export const withLoadingSpinner = WrappedComponent => {
  /* eslint-disable react/display-name */
  return props => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    return (
      <>
        <WrappedComponent
          {...props}
          startLoading={() => setOpen(true)}
          finishLoading={() => setOpen(false)}
        />
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  };
};
