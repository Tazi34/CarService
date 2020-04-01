import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

export const DatePicker = props => {
  const { dateLabel, date, onDateChange, minDate } = props;
  return (
    <KeyboardDatePicker
      minDate={minDate}
      autoOk={true}
      fullWidth
      variant="dialog"
      disablePast={true}
      format="dd/MM/yyyy"
      margin="normal"
      label={dateLabel}
      value={date}
      onChange={onDateChange}
      KeyboardButtonProps={{
        "aria-label": "change date"
      }}
    />
  );
};
