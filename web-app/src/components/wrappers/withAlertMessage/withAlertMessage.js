import React, { useState } from "react";

import { AlertMessage } from "../../alertSnackBar/AlertMessage";

export function withAlertMessage(WrappedComponent) {
  /* eslint-disable react/display-name */
  return props => {
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState(null);
    const [open, setOpen] = useState(false);

    const alertMessage = (message, severity) => {
      setMessage(message);
      setSeverity(severity);
      setOpen(true);
    };

    const alertSuccess = message => {
      alertMessage(message, "success");
    };
    const alertError = message => {
      alertMessage(message, "error");
    };
    const alertInfo = message => {
      alertMessage(message, "info");
    };

    return (
      <>
        <WrappedComponent
          alertInfo={alertInfo}
          alertError={alertError}
          alertSuccess={alertSuccess}
          {...props}
        />
        <AlertMessage
          severity={severity}
          message={message}
          open={open}
          onClose={() => setOpen(false)}
        ></AlertMessage>
      </>
    );
  };
}
