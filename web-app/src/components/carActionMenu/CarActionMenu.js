import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { ActionMenuItem } from "./ActionMenuItem";
import { StyledMenu } from "../UI/StyledMenu";

import BlockIcon from "@material-ui/icons/Block";
import { ConfirmationDialog } from "../confirmationDialog/ConfirmationDialog";
import Dialog from "@material-ui/core/Dialog";
import { BlockCarForm } from "../blockCarForm/BlockCarForm";

export default function CarActionMenu({ car, blockCar, deleteCar, ...props }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div {...props}>
      <KeyboardArrowDownIcon color="primary" onClick={handleClick} />
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ActionMenuItem
          title={"Block"}
          onSubmit={blockFormValues => blockCar(car, blockFormValues)}
          onClose={handleClose}
          icon={BlockIcon}
          render={({ handleSubmit, handleClose, isOpen }) => {
            return (
              <Dialog onClose={handleClose} open={isOpen}>
                <BlockCarForm onSubmit={handleSubmit} onBack={handleClose} />
              </Dialog>
            );
          }}
        />
        <ActionMenuItem
          title={"Delete"}
          onSubmit={() => deleteCar(car)}
          icon={DeleteIcon}
          onClose={handleClose}
          render={({ handleSubmit, handleClose, isOpen }) => (
            <ConfirmationDialog
              onClose={handleClose}
              open={isOpen}
              onConfirm={handleSubmit}
              onReject={handleClose}
            />
          )}
        />
      </StyledMenu>
    </div>
  );
}
