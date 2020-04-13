import React, { useState } from "react";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { CarFormDialog } from "./CarFormDialog";

export const CarFormOpenButton = ({ onSubmit, ...props }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = car => {
    setOpen(false);
    onSubmit(car);
  };

  return (
    <>
      <AddBoxIcon
        {...props}
        color={"primary"}
        fontSize={"large"}
        onClick={() => setOpen(true)}
      />
      <CarFormDialog
        onClose={() => setOpen(false)}
        open={open}
        onSubmit={handleSubmit}
      />
    </>
  );
};
