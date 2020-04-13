import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

export const ConfirmationDialog = ({ onConfirm, onReject, open, ...props }) => {
  return (
    <Dialog {...props} open={open} onClose={onReject}>
      <DialogTitle style={{ padding: 30, paddingBottom: 20 }}>
        CONFIRM ACTION
      </DialogTitle>
      <DialogActions style={{ display: "flex", justify: "center" }}>
        <Button fullWidth onClick={onReject} variant={"contained"}>
          Back
        </Button>
        <Button
          fullWidth
          onClick={onConfirm}
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
