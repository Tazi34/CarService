import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

export const ReturnButton = props => {
  const history = useHistory();
  return <Button {...props} onClick={history.goBack}></Button>;
};
