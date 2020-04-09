import React from "react";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";

export const RedirectButton = ({ to, ...props }) => {
  const history = useHistory();
  return <Button {...props} onClick={() => history.push(to)} />;
};
