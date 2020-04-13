import React from "react";
import { CarForm } from "../carForm/CarForm";
import Dialog from "@material-ui/core/Dialog";

export const CarFormDialog = ({ open, onClose, onSubmit, ...props }) => {
  return (
    <Dialog onClose={onClose} open={open} {...props}>
      <CarForm onSubmit={onSubmit} onBack={onClose} />
    </Dialog>
  );
};
