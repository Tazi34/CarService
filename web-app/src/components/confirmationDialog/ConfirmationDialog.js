import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

export const ConfirmationDialog = props => {
  return (
    <Dialog {...props}>
      <DialogTitle style={{ padding: 30, paddingBottom: 20 }}>
        CONFIRM ACTION
      </DialogTitle>
      <DialogActions style={{ display: "flex", justify: "center" }}>
        <Button
          fullWidth={true}
          onClick={props.onRejection}
          variant={"contained"}
        >
          Disagree
        </Button>
        <Button
          fullWidth={true}
          onClick={props.onConfirmation}
          color="primary"
          autoFocus
          variant={"contained"}
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
