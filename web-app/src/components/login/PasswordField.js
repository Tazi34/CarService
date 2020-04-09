import React, { useState } from "react";
import { TextField } from "mui-rff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export const PasswordField = props => {
  const handleClickShowPassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  return (
    <TextField
      {...props}
      type={passwordVisibility ? "text" : "password"}
      autoComplete={"current-password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position={"end"}>
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {passwordVisibility ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};
